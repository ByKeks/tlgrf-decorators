
import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { update } from 'telegrafer';
import { Connect } from './../decorators/connect';
import { Hears } from './../decorators/hears';

describe('Tlgrf:Decorators', () => {
  let bot: Telegraf<ContextMessageUpdate>;

  beforeAll(() => {
    bot = new Telegraf('test:token');
  });

  describe('"start" decorator', () => {
    it(`should handle "start" command`, (done) => {
      @Connect(bot)
      class Handler {
        @Hears(/./)
        private onMessage(ctx: ContextMessageUpdate) {
          ctx.reply('goodbye!');
        }
      }

      const handler = new Handler();

      update(bot)
        .message('hello!')
        .reply()
        .method('sendMessage')
        .data({ chat_id: 0, text: 'goodbye!' })
        .end(done);
    });
  });
});
