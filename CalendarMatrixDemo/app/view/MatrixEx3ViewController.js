/*
 * File: app/view/MatrixEx3ViewController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CalendarMatrix.view.MatrixEx3ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.matrixex3',

    mixins: {
        LanguageMixin: 'CalendarMatrix.view.LanguageMixin'
    },

    openCalendar: function(cont) {
        var me = this;

        var el = cont.getEl();
        var y = el.getY()+el.getHeight()+10;

        var myWindow = me.getView().myWindow;

        if (!myWindow){
            me.createWindow(20, y);
        }
        else {
            myWindow.showAt(20, y, {duration: 100});
        }


    },

    createWindow: function(x,y) {
        var me = this;

        myWindow = Ext.create('Ext.window.Window', {
            width: 895,
            height: 340,
            cls: 'matrix-ex3-cal',
            style: 'padding: 4px;',
            itemId: 'calendarPopupWindow',
            header: false
        });


        me.getView().myWindow = myWindow;

        var renderTplOverride = [  // Overriding default renderTpl (refer to Ext.picker.Date) to include 3-chars in weekday names... see firstInitial() template method
            '<div id="{id}-innerEl" data-ref="innerEl">',
            '<div class="{baseCls}-header">',
            '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="button" title="{prevText}"></div>',
            '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
            '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="button" title="{nextText}"></div>',
            '</div>',
            '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" {%',
            // If the DatePicker is focusable, make its eventEl tabbable.
            // Note that we're looking at the `focusable` property because
            // calling `isFocusable()` will always return false at that point
            // as the picker is not yet rendered.
            'if (values.$comp.focusable) {out.push("tabindex=\\\"0\\\"");}',
            '%} cellspacing="0">',
            '<thead><tr role="row">',
            '<tpl for="dayNames">',
            '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
            '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
            '</th>',
            '</tpl>',
            '</tr></thead>',
            '<tbody><tr role="row">',
            '<tpl for="days">',
            '{#:this.isEndOfWeek}',
            '<td role="gridcell">',
            '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
            '</td>',
            '</tpl>',
            '</tr></tbody>',
            '</table>',
            '<tpl if="showToday">',
            '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
            '</tpl>',
            '</div>',
            {
                firstInitial: function(value) {
                    return value.substr(0, 3).toUpperCase();  // Overridden for this example to show 3 characters for day of week
                },
                isEndOfWeek: function(value) {
                    // convert from 1 based index to 0 based
                    // by decrementing value once.
                    value--;
                    var end = value % 7 === 0 && value !== 0;
                    return end ? '</tr><tr role="row">' : '';
                },
                renderTodayBtn: function(values, out) {
                    Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
                },
                renderMonthBtn: function(values, out) {
                    Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
                }
            }
        ];

        var languageSelect = me.lookupReference('languageSelect');

        var cal = Ext.create('Ext.ux.CalendarMatrix.CalendarMatrix', {
            numRows: 1,
            numCols: 3,
            matrixDisabled: false,
            matrixMode: 'SINGLE',
            cls: 'matrix-cal',
            itemId: 'matrixEx3Cal',
            preSelectedDts: [],  // Could pass pre-selected date here
            includeMonthPicker: true,
            startDay: languageSelect.startDay ? languageSelect.startDay : 0,
            renderTplOverride: renderTplOverride,
            overrideCellHtmlFn: function(cls, dayNum, cellDate){
                // Add # days from today to each cell (Financial Day Count calendar)
                var myHtml=dayNum;
                if (cls === this.activeCls){
                    var today= Ext.Date.clearTime(new Date(Date(Ext.Date.now())), true);
                    var diff = Ext.Date.diff(today, cellDate, Ext.Date.DAY);
                    var diffStr = (diff>0 ? diff.toString() : '&nbsp;');
                    myHtml = myHtml+'<div class="daycount-inner">'+diffStr+'</div>';
                }
                return myHtml;
            },
            disableFn: function(cellDate, matrixCont){  // Disable all days prior to today from selection
                var today= Ext.Date.clearTime(new Date(Date(Ext.Date.now())), true);
                return (cellDate < today);
            },
            customClsFn: function(cellDate){ // Speical styling for weekend days
               var customCls = '';
               if ([0,6].indexOf(parseInt(Ext.Date.format(cellDate, 'w'))) !== -1) {
                   customCls = 'weekend';
               }
               return customCls;
            }
        });

        if (languageSelect.todayText){
            cal.down('#calGridTodayBtn').setText(languageSelect.todayText);
        }

        cal.mon(cal, 'calendarselect', me.handleSelect, me);

        myWindow.add(cal);

        myWindow.showAt(x, y, {duration: 100});


    },

    handleSelect: function(calendarMatrix, selDt, selDate, selVal) {
        var me=this;

        var day_html = me.lookupReference('day');
        day_html.update(Ext.Date.format(selDate, 'j')+' <span class="button-year">' + Ext.Date.format(selDate, 'Y')+'</span>');
        day_html.addCls('button-day');
        day_html.selDate = selDate;
        day_html.selDt = selDt;

        var other_html = me.lookupReference('dayname_month');
        other_html.update(Ext.Date.format(selDate, 'D')+'<br>'+Ext.Date.format(selDate, 'M'));

        me.getView().myWindow.setHidden(true);

    },

    onLanguageSelectChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        this.languageCalendarOverrides(this, newValue, field.findRecordByValue(newValue).get('language')); // see mixin
        var myWindow = me.getView().myWindow;
        if (myWindow){
            var matrix = myWindow.down('#matrixEx3Cal');
            matrix.setStartDay(field.startDay);
            matrix.dispCalGrid();
            matrix.down('#calGridTodayBtn').setText(field.todayText);
            if (matrix.monthPicker){
                Ext.destroy(matrix.monthPicker);
                matrix.monthPicker = undefined;
            }

            var day_html = me.lookupReference('day');
            if (day_html.selDate){
                day_html.update(Ext.Date.format(day_html.selDate, 'j')+' <span class="button-year">' + Ext.Date.format(day_html.selDate, 'Y')+'</span>');
                var other_html = me.lookupReference('dayname_month');
                other_html.update(Ext.Date.format(day_html.selDate, 'D')+'<br>'+Ext.Date.format(day_html.selDate, 'M'));
            }

        }
    }

});
