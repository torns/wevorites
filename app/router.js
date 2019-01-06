'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/code', controller.auth.authenticate)

  const hasPermission = app.middleware.hasPermission()
  router.get('/view/:memberId', controller.favorite.view)
  router.get('/list/:memberId', controller.favorite.list)

  router.resources('/favorite', '/api/favorite', controller.favorite)
  router.resources('/user', '/api/user', controller.user)
  router.resources('/session', '/api/session', controller.session)
};