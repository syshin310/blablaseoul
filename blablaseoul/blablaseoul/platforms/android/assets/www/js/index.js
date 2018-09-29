/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var events = [
    'pageshow'
].join(' ');


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.addEventListener("backbutton", onBackKeyPress, false);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var parentElement = document.getElementById(id);
        if (parentElement != null) {
            var receivedElement = parentElement.querySelector('.received');
        }

        console.log('Received Event: ' + id);

        if(id == 'deviceready'){
            $.mobile.changePage("sign.html", {
                //reverse:true
            });
            navigator.splashscreen.hide();
        }
    }
};

function onBackKeyPress() {
    /* If the current page is the login page, disable the button completely (aka do nothing) */
    if ($.mobile.activePage.attr('id') == 'login_page') {
    }

    /* Else, execute log off code */
    else {
        if (confirm("Are you sure you want to finish?")) {
            /* Here is where my AJAX code for logging off goes */
            navigator.app.exitApp();
        }
        else {
            return false;
        }
    }
}

app.initialize();