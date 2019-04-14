import Telegraf from 'telegraf';
import { update } from 'telegrafer';
import {
  Connect, start, help, settings, command,
  ContextMessageUpdate,
} from './../decorators';

describe('TelegrafDecorators', () => {
  let bot: Telegraf<ContextMessageUpdate>;

  beforeAll(() => {
    bot = new Telegraf('test:token');
  });

  describe('"command" decorator', () => {
    for (const commandName of ['start', 'help', 'foo', 'settings', 'boo', 'bar']) {
      it(`should handle "${commandName}" command`, (done) => {
        @Connect(bot)
        class CommandHandler {
          @command(commandName)
          private onCommand(ctx: ContextMessageUpdate) {
            ctx.reply(commandName);
          }
        }

        const handler = new CommandHandler();

        update(bot)
          .command(commandName)
          .reply()
          .method('sendMessage')
          .data({ chat_id: 0, text: commandName })
          .end(done);
      });
    }
  });

  describe('"start" decorator', () => {
    it(`should handle "start" command`, (done) => {
      @Connect(bot)
      class Handler {
        @start
        private onCommand(ctx: ContextMessageUpdate) {
          ctx.reply('start');
        }
      }

      const handler = new Handler();

      update(bot)
        .start()
        .reply()
        .method('sendMessage')
        .data({ chat_id: 0, text: 'start' })
        .end(done);
    });
  });

  describe('"help" decorator', () => {
    it(`should handle "help" command`, (done) => {
      @Connect(bot)
      class Handler {
        @help
        private onCommand(ctx: ContextMessageUpdate) {
          ctx.reply('help');
        }
      }

      const handler = new Handler();

      update(bot)
        .help()
        .reply()
        .method('sendMessage')
        .data({ chat_id: 0, text: 'help' })
        .end(done);
    });
  });

  describe('"settings" decorator', () => {
    it(`should handle "settings" command`, (done) => {
      @Connect(bot)
      class Handler {
        @settings
        private onCommand(ctx: ContextMessageUpdate) {
          ctx.reply('settings');
        }
      }

      const handler = new Handler();

      update(bot)
        .settings()
        .reply()
        .method('sendMessage')
        .data({ chat_id: 0, text: 'settings' })
        .end(done);
    });
  });
});
