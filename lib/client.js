
const _ = require('lodash');
const request = require('request');

/** Class representing Slack client */
module.exports = class Slack {

    /**
     * Create a Slack client
     * @param {object|string} opts
     * @param {string} opts.url - Slack Incoming Webhook url
     * @param {string} opts.name - Sender name to override default
     * @param {string} opts.channel - Channel or receiver name to override default
     * @param {string} opts.icon_emoji - Slack bot icon
     */
    constructor(opts) {
        if(typeof opts === 'object') {
            this.url = opts.url;
            this.payload = opts;
        } else {
            this.url = opts;
            this.payload = {};
        }
        if(!this.url) {
            throw new Error('Slack Incoming Webhook url is required');
        }
    }

    /**
     * Send a Slack message
     * @param {object|string} opts - message text or message options to override default
     * @param {string} opts.text - Slack Incoming Webhook url
     */
    send(opts, callback) {
        const payload = this.payload;

        if (typeof callback !== 'function') {
            callback = _.noop;
        }

        if (typeof opts === 'object') {
            _.defaultsDeep(payload, opts);
        } else {
            payload.text = opts.toString();
        }

        if(!payload.text) {
            return callback(new Error('Message is empty'));
        }

        const requestOpts = {
            method: 'POST',
            url: this.url,
            json: true,
            headers: {
                'content-type': 'application/json',
                'user-agent': 'easy-slack'
            },
            body: payload
        };
        request(requestOpts, callback);
    }
}
