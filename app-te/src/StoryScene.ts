import {Action, Ctx, Hears, Scene, SceneEnter} from 'nestjs-telegraf';
import {SceneContext} from 'telegraf/typings/scenes';
import {Update} from 'telegraf/typings/core/types/typegram';

@Scene('basicScene')
export class StoryScene {
   @SceneEnter()
   async enter(@Ctx() context: SceneContext) {
       context.reply('2+2 = ?', {
           reply_markup: {
               inline_keyboard: [
                   [{text: 'Может быть 4?', callback_data: '4'}],
                   [{text: 'Точно пять!', callback_data: '5'}],
               ],
           },
       });
   }

   @Action(/4|5/)
   async onAnswer(
     @Ctx() context: SceneContext & {update: Update.CallbackQueryUpdate}
   ) {
       const cbQuery = context.update.callback_query;
       const userAnswer = 'data' in cbQuery ? cbQuery.data : null;

       if (userAnswer === '4') {
           context.reply('верно!');
           context.scene.enter('nextSceneId');
       } else {
           context.reply('подумай еще');
       }
   }
}