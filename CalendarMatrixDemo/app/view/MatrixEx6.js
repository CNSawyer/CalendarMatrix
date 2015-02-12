/*
 * File: app/view/MatrixEx6.js
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

Ext.define('CalendarMatrix.view.MatrixEx6', {
    extend: 'Ext.container.Container',
    alias: 'widget.matrixex6',

    requires: [
        'CalendarMatrix.view.MatrixEx6ViewModel',
        'CalendarMatrix.view.MatrixEx6ViewController',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    controller: 'matrixex6',
    viewModel: {
        type: 'matrixex6'
    },
    cls: 'matrix-ex6-cal',
    itemId: 'matrixEx6',
    margin: 5,
    style: 'background-color: white;',
    layout: 'border',

    items: [
        {
            xtype: 'container',
            region: 'north',
            html: 'Expedia and Travelocity style date range selector. Also demonstrates the following:<br> - Customized month navigation arrows with logic to show hide based on selected dates<br> - Demonstrates how to process \'mouseover\' event to dynamically paint range as user hovers<br> - Utilizes disableFn config to dynamically disable prior and future dates based on startDate vs. endDate selection mode.',
            style: 'margin: 20px 0; font-size: 18px;'
        },
        {
            xtype: 'toolbar',
            region: 'north',
            height: 60,
            items: [
                {
                    xtype: 'button',
                    reference: 'startBtn',
                    cls: 'inputBtn',
                    height: 45,
                    itemId: 'startBtn',
                    ui: 'plain',
                    width: 150,
                    iconCls: 'fa-icon-calendar',
                    text: 'mm/dd/yyyy',
                    listeners: {
                        click: 'onStartBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'endBtn',
                    cls: 'inputBtn',
                    height: 45,
                    itemId: 'endBtn',
                    ui: 'plain',
                    width: 150,
                    iconCls: 'fa-icon-calendar',
                    text: 'mm/dd/yyyy',
                    listeners: {
                        click: 'onEndBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    height: 30,
                    itemId: 'resetBtn',
                    ui: 'plain',
                    width: 30,
                    iconCls: 'fa-icon-remove',
                    listeners: {
                        click: 'onResetBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'findBtn',
                    cls: 'find-btn',
                    height: 45,
                    itemId: 'findBtn',
                    ui: 'plain',
                    width: 85,
                    text: 'Search',
                    listeners: {
                        click: 'onFindBtnClick'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            region: 'center'
        }
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);

    }

});