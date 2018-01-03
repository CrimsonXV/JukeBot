class MessageCollector {  // eslint-disable-line no-unused-vars
    constructor() {
        this.collectors = [];
    }

    setup(client) {
        client.on('messageCreate', this.check.bind(this));
    }

    awaitMessages(check, channelId) {
        return new Promise((accept) => {
            this.collectors.push({
                channelId,
                check,
                accept
            });
        });
    }

    check(message) {
        if (!this.collectors.length) return false;

        const _collectors = this.collectors.filter(c => c.channelId === message.channel.id);

        for (const collector of _collectors) {
            if (collector.check(message)) {
                collector.accept(message);
                this.collectors.splice(this.collectors.indexOf(collector), 1);
            }
        }
    }
}

module.exports = MessageCollector;