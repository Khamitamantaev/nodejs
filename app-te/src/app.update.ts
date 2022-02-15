import {
    Update,
    Start,
    Help,
    On,
    Hears,
    Command,
  } from 'nestjs-telegraf';
    import {Context} from './interfaces/context.interface'
  
  @Update()
  export class AppUpdate { 
  
    @Start()
    async startCommand(ctx: Context) {
      await ctx.reply('Welcome');
    }
  
    @Help()
    async helpCommand(ctx: Context) {
      await ctx.reply('Send me a sticker');
    }
  
    @On('sticker')
    async onSticker(ctx: Context) {
      await ctx.reply('👍');
    }

    @Command('cats')
    async helpCommandw(ctx: Context) {
    await ctx.reply('Meow.');  
  } 
  
    @Hears('hi')
    async hearsHi(ctx: Context) {
      await ctx.reply('Hey there');
    }
  }