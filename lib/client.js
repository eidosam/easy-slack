
/** Class representing Slack client */
module.exports = class Slack {

    /**
     * Create a Slack client
     * @param {object} opts
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
            this.url = opts.url;
            this.payload = {};
        }
        if(!this.url) {
            throw new Error('Slack Incoming Webhook url is required');
        }
    }

}