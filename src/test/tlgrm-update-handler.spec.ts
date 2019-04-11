import Telegraf from 'telegraf';
import * as commands from './mocks';
import {
  TlgrmUpdateHandler, start, help, settings, command,
  ContextMessageUpdate, ITlgrmUpdateHandler,
} from './../tlgrm-update-handler';

describe('TlgrmUpdateHandler', () => {
  describe('"command" decorator', () => {
    for (const commandName of ['start', 'help', 'foo', 'settings', 'boo', 'bar']) {
      it(`should handle "${commandName}" command`, (done) => {
        class CommandHandler {
          @command(commandName)
          private onCommand(ctx: ContextMessageUpdate) {
            done();
          }
        }

        const bot = new Telegraf(null);
        const handler: ITlgrmUpdateHandler = new (TlgrmUpdateHandler(bot)(CommandHandler))();

        bot.handleUpdate(commands.makeCommand(commandName));
      });
    }
  });

  describe('"start" decorator', () => {
    it(`should handle "start" command`, (done) => {
      class Handler {
        @start
        private onCommand(ctx: ContextMessageUpdate) {
          done();
        }
      }

      const bot = new Telegraf(null);
      const handler: ITlgrmUpdateHandler = new (TlgrmUpdateHandler(bot)(Handler))();

      bot.handleUpdate(commands.makeCommand('start'));
    });
  });

  describe('"help" decorator', () => {
    it(`should handle "help" command`, (done) => {
      class Handler {
        @help
        private onCommand(ctx: ContextMessageUpdate) {
          done();
        }
      }

      const bot = new Telegraf(null);
      const handler: ITlgrmUpdateHandler = new (TlgrmUpdateHandler(bot)(Handler))();

      bot.handleUpdate(commands.makeCommand('help'));
    });
  });

  describe('"settings" decorator', () => {
    it(`should handle "settings" command`, (done) => {
      class Handler {
        @settings
        private onCommand(ctx: ContextMessageUpdate) {
          done();
        }
      }
  
      const bot = new Telegraf(null);
      const handler: ITlgrmUpdateHandler = new (TlgrmUpdateHandler(bot)(Handler))();
  
      bot.handleUpdate(commands.makeCommand('settings'));
    });
  });
});
