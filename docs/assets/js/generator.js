steem.api.setOptions({ url: 'https://api.steemit.com' });

var generator = new Vue({
    el: '#generator',
    data: {
        type: 'profile',
        template: 'default',
        user: 'mkt',
        tag: '',
        currency: 'steem',
        currencies: [],
        showAvatar: true,
        showLogo: true,
        showName: true,
        showRank: true,
        showSymbol: true,
        show24HVolumne: true,
        showAvailableSupply: false,
        showTotalSupply: false,
        showMarketCap: true,
        showPercentChange1h: true,
        showPercentChange24h: true,
        showPercentChange7d: true,
        showPriceBTC: true,
        showPriceUSD: true,
        priceBTCPrecision: 8,
        priceUSDPrecision: 2,
        showUsername: true,
        showAuthor: true,
        showWebsite: true,
        showAbout: true,
        showLocation: true,
        showCreated: true,
        showCover: true,
        showFollowers: true,
        showFollowing: true,
        showPosts: true,
        showVotingPower: true,
        showReputation: true,
        showTitle: true,
        showDate: true,
        showImage: true,
        showUpvotes: true,
        showPayout: true,
        showComments: true,
        showResteemed: true,
        showResteemedBy: true,
        showCategory: true,
        reputationPrecision: 1,
        votingPowerPrecision: 1,
        border: 5,
        borderRadius: 5,
        color: '#00a8e6',
        limit: 10,
        updateInterval: 60,
        updateDelayTimeout: null,
        scriptSteemjs: '<script src="https://cdn.steemjs.com/lib/latest/steem.min.js"></script>',
        scriptSteemitWidgets: '<script src="https://mktcode.github.io/steemit-widgets/assets/js/steemit-widgets.min.js"></script>',
        scriptMomentjs: '<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>'
    },
    created: function () {
        $.getJSON('https://api.coinmarketcap.com/v1/ticker/', (currencies) => {
            this.currencies = currencies;
        });
    },
    mounted: function () {
        this.renderPreview();
    },
    methods: {
        renderPreview: function () {
            this.clearPluginIntervals();
            var preview = $('#preview');
            switch (this.type) {
                case 'profile':
                    steem.api.getAccounts([this.user], function(err, accounts) {
                        if (!err && accounts.length) {
                            preview.steemitProfile({
                                user: this.user,
                                template: 'steemit-profile-template-' + this.template,
                                reputationPrecision: this.reputationPrecision,
                                votingPowerPrecision: this.votingPowerPrecision,
                                updateInterval: this.updateInterval
                            });
                        } else {
                            preview.html('<div class="uk-text-center uk-text-danger">Username "' + this.user + '" not found.</div>');
                        }
                    }.bind(this));
                    break;
                case 'ticker':
                    this.template = 'default';
                    preview.steemitTicker({
                        currency: this.currency,
                        template: 'steemit-ticker-template-' + this.template,
                        priceBTCPrecision: this.priceBTCPrecision,
                        priceUSDPrecision: this.priceUSDPrecision,
                        updateInterval: Math.max(this.updateInterval, 300)
                    });
                    break;
                case 'blog':
                    steem.api.getAccounts([this.user], function(err, accounts) {
                        if (!err && accounts.length) {
                            preview.steemitBlog({
                                user: this.user,
                                limit: this.limit,
                                template: 'steemit-blog-template-' + this.template,
                                resteemedIndicator: '<span style="width: 15px; height: 15px; display: inline-block;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#008800" d="M448,192l-128,96v-64H128v128h248c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8V168c0-4.4,3.6-8,8-8h248V96 L448,192z"></path></svg></span>',
                                reputationPrecision: this.reputationPrecision,
                                updateInterval: this.updateInterval,
                                dateCallback: function (date) {
                                    return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                                }
                            });
                        } else {
                            preview.html('<div class="uk-text-center uk-text-danger">Username "' + this.user + '" not found.</div>');
                        }
                    }.bind(this));
                    break;
                case 'feed':
                    steem.api.getAccounts([this.user], function(err, accounts) {
                        if (!err && accounts.length) {
                            preview.steemitFeed({
                                user: this.user,
                                limit: this.limit,
                                template: 'steemit-feed-template-' + this.template,
                                resteemedIndicator: '<span style="width: 15px; height: 15px; display: inline-block;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#008800" d="M448,192l-128,96v-64H128v128h248c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8V168c0-4.4,3.6-8,8-8h248V96 L448,192z"></path></svg></span>',
                                reputationPrecision: this.reputationPrecision,
                                updateInterval: this.updateInterval,
                                dateCallback: function (date) {
                                    return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                                }
                            });
                        } else {
                            preview.html('<div class="uk-text-center uk-text-danger">Username "' + this.user + '" not found.</div>');
                        }
                    }.bind(this));
                    break;
                case 'new':
                    preview.steemitNew({
                        tag: this.tag,
                        limit: this.limit,
                        template: 'steemit-newhottrending-template-' + this.template,
                        reputationPrecision: this.reputationPrecision,
                        updateInterval: this.updateInterval,
                        dateCallback: function (date) {
                            return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                        }
                    });
                    break;
                case 'hot':
                    preview.steemitHot({
                        tag: this.tag,
                        limit: this.limit,
                        template: 'steemit-newhottrending-template-' + this.template,
                        reputationPrecision: this.reputationPrecision,
                        updateInterval: this.updateInterval,
                        dateCallback: function (date) {
                            return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                        }
                    });
                    break;
                case 'trending':
                    preview.steemitTrending({
                        tag: this.tag,
                        limit: this.limit,
                        template: 'steemit-newhottrending-template-' + this.template,
                        reputationPrecision: this.reputationPrecision,
                        updateInterval: this.updateInterval,
                        dateCallback: function (date) {
                            return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                        }
                    });
                    break;
            }
            this.renderCode();
        },
        renderCode: function () {
            var codeHeadContainer = $('#code-head'),
                codeWidgetContainer = $('#code-body'),
                codeScriptsContainer = $('#code-scripts'),
                code = '',
                nl = "\n";

            if (this.template == 'condenser') {
                codeHeadContainer.html('<pre><code class="html hljs xml">&lt;link href=&quot;https://fonts.googleapis.com/css?family=Source+Sans+Pro&quot; rel=&quot;stylesheet&quot;&gt;</code></pre>');
            }

            switch (this.type) {
                case 'profile':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;steemit-widgets-profile&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('steemit-profile-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptSteemjs) + nl
                         + this.encodeHTML(this.scriptSteemitWidgets) + nl
                         + '&lt;script&gt;' + nl
                         + '  steemitWidgets.profile({' + nl
                         + '    element: \'steemit-widgets-profile\',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    user: \'' + this.user + '\',' + nl
                         + '    reputationPrecision: ' + this.reputationPrecision + ',' + nl
                         + '    votingPowerPrecision: ' + this.votingPowerPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
                case 'ticker':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;steemit-widgets-ticker&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('steemit-ticker-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptSteemjs) + nl
                         + this.encodeHTML(this.scriptSteemitWidgets) + nl
                         + '&lt;script&gt;' + nl
                         + '  steemitWidgets.ticker({' + nl
                         + '    element: \'steemit-widgets-ticker\',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    currency: \'' + this.currency + '\',' + nl
                         + '    priceBTCPrecision: ' + this.priceBTCPrecision + ',' + nl
                         + '    priceUSDPrecision: ' + this.priceUSDPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
                case 'blog':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;steemit-widgets-blog&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('steemit-blog-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptSteemjs) + nl
                         + this.encodeHTML(this.scriptSteemitWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  steemitWidgets.blog({' + nl
                         + '    element: \'steemit-widgets-blog\',' + nl
                         + '    user: \'' + this.user + '\',' + nl
                         + '    limit: ' + this.limit + ',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    resteemedIndicator: \'' + this.encodeHTML('<span style="width: 15px; height: 15px; display: inline-block;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M448,192l-128,96v-64H128v128h248c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8V168c0-4.4,3.6-8,8-8h248V96 L448,192z"></path></svg></span>') + '\',' + nl
                         + '    reputationPrecision: ' + this.reputationPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + ',' + nl
                         + '    dateCallback: function (date) {return moment.utc(date).from(moment.utc().format(\'YYYY-MM-DD HH:mm:ss\'));}' + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
                case 'feed':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;steemit-widgets-feed&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('steemit-feed-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptSteemjs) + nl
                         + this.encodeHTML(this.scriptSteemitWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  steemitWidgets.feed({' + nl
                         + '    element: \'steemit-widgets-feed\',' + nl
                         + '    user: \'' + this.user + '\',' + nl
                         + '    limit: ' + this.limit + ',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    resteemedIndicator: \'' + this.encodeHTML('<span style="width: 15px; height: 15px; display: inline-block;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M448,192l-128,96v-64H128v128h248c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8V168c0-4.4,3.6-8,8-8h248V96 L448,192z"></path></svg></span>') + '\',' + nl
                         + '    reputationPrecision: ' + this.reputationPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + ',' + nl
                         + '    dateCallback: function (date) {return moment.utc(date).from(moment.utc().format(\'YYYY-MM-DD HH:mm:ss\'));}' + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
                case 'new':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;steemit-widgets-new&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('steemit-newhottrending-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptSteemjs) + nl
                         + this.encodeHTML(this.scriptSteemitWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  steemitWidgets.new({' + nl
                         + '    element: \'steemit-widgets-new\',' + nl
                         + '    user: \'' + this.user + '\',' + nl
                         + '    limit: ' + this.limit + ',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    reputationPrecision: ' + this.reputationPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + ',' + nl
                         + '    dateCallback: function (date) {return moment.utc(date).from(moment.utc().format(\'YYYY-MM-DD HH:mm:ss\'));}' + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
                case 'hot':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;steemit-widgets-hot&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('steemit-newhottrending-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptSteemjs) + nl
                         + this.encodeHTML(this.scriptSteemitWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  steemitWidgets.hot({' + nl
                         + '    element: \'steemit-widgets-hot\',' + nl
                         + '    user: \'' + this.user + '\',' + nl
                         + '    limit: ' + this.limit + ',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    reputationPrecision: ' + this.reputationPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + ',' + nl
                         + '    dateCallback: function (date) {return moment.utc(date).from(moment.utc().format(\'YYYY-MM-DD HH:mm:ss\'));}' + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
                case 'trending':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;steemit-widgets-trending&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('steemit-newhottrending-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptSteemjs) + nl
                         + this.encodeHTML(this.scriptSteemitWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  steemitWidgets.trending({' + nl
                         + '    element: \'steemit-widgets-trending\',' + nl
                         + '    user: \'' + this.user + '\',' + nl
                         + '    limit: ' + this.limit + ',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    reputationPrecision: ' + this.reputationPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + ',' + nl
                         + '    dateCallback: function (date) {return moment.utc(date).from(moment.utc().format(\'YYYY-MM-DD HH:mm:ss\'));}' + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
            }
            $('.hljs').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },
        clearPluginIntervals: function () {
            steemitWidgets.updateIntervals.map(intervalId => clearInterval(intervalId));
        },
        encodeHTML: function (html) {
            return html.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;')
                ;
        }
    },
    computed: {
        profileCoverStyle: function () {
            return this.showCover ? 'background-image: url(${COVERIMAGE}); background-position: center center; background-size: cover;' : '';
        }
    }
});

hljs.configure({style: 'github'});
hljs.initHighlightingOnLoad();
