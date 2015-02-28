import Ember from 'ember';
import startApp from '../../helpers/start-app';
import controller from 'ember-pretenderify/controllers/front';
import Store from 'ember-pretenderify/store';

var App;
var store;

module('pretenderify:frontController POST', {
  setup: function() {
    App = startApp();
    store = new Store();
    store.emptyData();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("string shorthand works", function() {
  var body = '{"contact":{"name":"Ganon"}}';
  var result = controller.handle('post', 'contact', store, {requestBody: body});

  var contactsInStore = store.findAll('contact');
  equal(contactsInStore.length, 1);
  deepEqual(result[2], {contact: {id: 1, name: 'Ganon'}});
});

test("undefined shorthand works", function() {
  var body = '{"contact":{"name":"Ganon"}}';
  var result = controller.handle('post', undefined, store, {requestBody: body, url: '/contacts'});

  var contactsInStore = store.findAll('contact');
  equal(contactsInStore.length, 1);
  deepEqual(result[2], {contact: {id: 1, name: 'Ganon'}});
});

test("works with multi-word models using a underscored URL and a hypheneated model name", function() {
  var body = '{"staff_member":{"name":"Ganon"}}';
  var result = controller.handle('post', 'staff-member', store, {requestBody: body, url: '/staff_members'});

  var staffMembersInStore = store.findAll('staff-member');
  equal(staffMembersInStore.length, 1);
  deepEqual(result[2], {'staff-member': {id: 1, name: 'Ganon'}});
});
