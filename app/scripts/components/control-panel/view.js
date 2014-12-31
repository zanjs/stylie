define([

  'lateralus'

  ,'text!./template.mustache'

  ,'lateralus.component.tabs'

], function (

  Lateralus

  ,template

  ,TabsComponent

) {
  'use strict';

  var Base = Lateralus.Component.View;
  var baseProto = Base.prototype;

  var LOCAL_STORAGE_FOCUSED_TAB_KEY = 'stylieControlPanelSavedTabName';

  var ControlPanelComponentView = Base.extend({
    template: template

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);

      this.tabsComponent = this.addSubview(TabsComponent.View, {
        $tabsContainer: this.$tabsContainer,
        $tabsContentContainer: this.$tabsContentContainer
      });

      this.selectTabFromLocalStorage();
      this.listenTo(this.tabsComponent, 'tabShown', this.onTabShown.bind(this));

      this.$el.dragon({
        handle: this.$tabsContainer
        ,within: this.$el.parent()
      });
    }

    /**
     * @param {jQuery} $shownTab
     */
    ,onTabShown: function ($shownTab) {
      this.storeSelectedTabName($shownTab.data('tabName'));
    }

    /**
     * @param {string} selectedTabName
     */
    ,storeSelectedTabName: function (selectedTabName) {
      window.localStorage[LOCAL_STORAGE_FOCUSED_TAB_KEY] = selectedTabName;
    }

    ,selectTabFromLocalStorage: function () {
      var focusedTabName = window.localStorage[LOCAL_STORAGE_FOCUSED_TAB_KEY];

      if (focusedTabName) {
        var $focusedTab = this.$tabsContainer.children()
          .filter('[data-tab-name="' + focusedTabName + '"]');

        this.tabsComponent.selectTab($focusedTab);
      }
    }
  });

  return ControlPanelComponentView;
});
