import Telegraf, { ContextMessageUpdate } from 'telegraf';
// @ts-ignore
import * as Markup from 'telegraf/markup';
import { update } from 'telegrafer';
import { Connect } from './../decorators/connect';
import { Action } from './../decorators/action';

describe('Tlgrf:Decorators', () => {
  let bot: Telegraf<ContextMessageUpdate>;

  beforeAll(() => {
    bot = new Telegraf('test:token');
  });

  describe('"action" decorator', () => {
    let buttonOne: any;
    let buttonTwo: any;

    beforeAll(() => {
      buttonOne = Markup.callbackButton('One Button', 'one');
      buttonTwo =  Markup.callbackButton('Two Button', 'two');

      @Connect(bot)
      class ActionHandler {
        @Action(buttonOne.callback_data)
        private onOne(ctx: ContextMessageUpdate) {
          return ctx.reply('Two!');
        }

        @Action(buttonTwo.callback_data)
        private onTwo(ctx: ContextMessageUpdate) {
          return ctx.reply('One!');
        }
      }

      const handler = new ActionHandler();
    });

    it(`should handle action "one"`, (done) => {
      update(bot)
        .action(buttonOne.callback_data)
        .reply()
        .method('sendMessage')
        .data({
          chat_id: 0,
          text: 'Two!',
        })
        .end(done);
    });

    it(`should handle action "two"`, (done) => {
      update(bot)
        .action(buttonTwo.callback_data)
        .reply()
        .method('sendMessage')
        .data({
          chat_id: 0,
          text: 'One!',
        })
        .end(done);
    });
  });
});
