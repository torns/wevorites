'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async view () {
    const memberId = this.ctx.params.memberId
    if (!memberId) {
      throw new Error('KeyError: Key can not be null')
    }

    const member = await this.ctx.model.Member.findOne({
      _id: memberId
    }).populate('favorites').exec()

    // // this.ctx.body = 'hi, egg';
    let title = `${member.name}`; //向模板传入数据
    await this.ctx.render('show.html',{
      title,
      memberId,
      webServer: this.ctx.app.config.webURL
    });
  }

  async list () {
    const memberId = this.ctx.params.memberId
    if (!memberId) {
      throw new Error('ParamError: memberId can not be null')
    }

    const favs = await this.ctx.model.Favorite.find({
      memberId
    },null, {
      skip:0, // Starting Row
      limit:2, // Ending Row
      sort:{
          create_at: -1 //Sort by Date Added DESC
      }
    })

    this.ctx.body = JSON.stringify(favs)
  }

  async create () {
    const favData  = this.ctx.request.body.favData

    let doc = await this.ctx.model.Favorite
      .findOneAndUpdate(
        {
          "url" : favData.url,  // search query
          "memberId": favData.memberId
        }, 
        {
          ...favData   // field:values to update
        },
        {
          new: true,                       // return updated doc
          runValidators: true              // validate before update
        })

    if (!doc) {
      const favObj = new this.ctx.model.Favorite(favData)
      doc = await favObj.save()
    }
    
    this.ctx.body = JSON.stringify(doc)
  }
}

module.exports = FavoriteController
