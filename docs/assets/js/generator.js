blurt.api.setOptions({ url: 'https://rpc.blurt.world', useAppbaseApi: true });

var generator = new Vue({
    el: '#generator',
    data: {
        type: 'profile',
        template: 'default',
        user: 'mkt',
        tag: '',
        currency: 'blurt',
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
        showReblurted: true,
        showReblurtedBy: true,
        showCategory: true,
        reputationPrecision: 1,
        votingPowerPrecision: 1,
        border: 5,
        borderRadius: 5,
        color: '#00a8e6',
        limit: 10,
        updateInterval: 60,
        updateDelayTimeout: null,
        scriptBlurtjs: '<script src="https://cdn.blurtjs.com/lib/latest/blurt.min.js"></script>',
        scriptBlurtWidgets: '<script src="https://mktcode.github.io/blurt-widgets/assets/js/blurt-widgets.min.js"></script>',
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
                    blurt.api.getAccounts([this.user], function(err, accounts) {
                        if (!err && accounts.length) {
                            preview.blurtProfile({
                                user: this.user,
                                template: 'blurt-profile-template-' + this.template,
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
                    preview.blurtTicker({
                        currency: this.currency,
                        template: 'blurt-ticker-template-' + this.template,
                        priceBTCPrecision: this.priceBTCPrecision,
                        priceUSDPrecision: this.priceUSDPrecision,
                        updateInterval: Math.max(this.updateInterval, 300)
                    });
                    break;
                case 'blog':
                    blurt.api.getAccounts([this.user], function(err, accounts) {
                        if (!err && accounts.length) {
                            preview.blurtBlog({
                                user: this.user,
                                limit: this.limit,
                                template: 'blurt-blog-template-' + this.template,
                                reblurtedIndicator: '<span style="width: 15px; height: 15px; display: inline-block;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#008800" d="M448,192l-128,96v-64H128v128h248c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8V168c0-4.4,3.6-8,8-8h248V96 L448,192z"></path></svg></span>',
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
                    blurt.api.getAccounts([this.user], function(err, accounts) {
                        if (!err && accounts.length) {
                            preview.blurtFeed({
                                user: this.user,
                                limit: this.limit,
                                template: 'blurt-feed-template-' + this.template,
                                reblurtedIndicator: '<span style="width: 15px; height: 15px; display: inline-block;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#008800" d="M448,192l-128,96v-64H128v128h248c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8V168c0-4.4,3.6-8,8-8h248V96 L448,192z"></path></svg></span>',
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
                    preview.blurtNew({
                        tag: this.tag,
                        limit: this.limit,
                        template: 'blurt-newhottrending-template-' + this.template,
                        reputationPrecision: this.reputationPrecision,
                        updateInterval: this.updateInterval,
                        dateCallback: function (date) {
                            return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                        }
                    });
                    break;
                case 'hot':
                    preview.blurtHot({
                        tag: this.tag,
                        limit: this.limit,
                        template: 'blurt-newhottrending-template-' + this.template,
                        reputationPrecision: this.reputationPrecision,
                        updateInterval: this.updateInterval,
                        dateCallback: function (date) {
                            return moment.utc(date).from(moment.utc().format('YYYY-MM-DD HH:mm:ss'));
                        }
                    });
                    break;
                case 'trending':
                    preview.blurtTrending({
                        tag: this.tag,
                        limit: this.limit,
                        template: 'blurt-newhottrending-template-' + this.template,
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
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;blurt-widgets-profile&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('blurt-profile-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptBlurtjs) + nl
                         + this.encodeHTML(this.scriptBlurtWidgets) + nl
                         + '&lt;script&gt;' + nl
                         + '  blurtWidgets.profile({' + nl
                         + '    element: \'blurt-widgets-profile\',' + nl
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
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;blurt-widgets-ticker&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('blurt-ticker-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptBlurtjs) + nl
                         + this.encodeHTML(this.scriptBlurtWidgets) + nl
                         + '&lt;script&gt;' + nl
                         + '  blurtWidgets.ticker({' + nl
                         + '    element: \'blurt-widgets-ticker\',' + nl
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
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;blurt-widgets-blog&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('blurt-blog-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptBlurtjs) + nl
                         + this.encodeHTML(this.scriptBlurtWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  blurtWidgets.blog({' + nl
                         + '    element: \'blurt-widgets-blog\',' + nl
                         + '    user: \'' + this.user + '\',' + nl
                         + '    limit: ' + this.limit + ',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    reblurtedIndicator: \'' + this.encodeHTML('<span style="width: 15px; height: 15px; display: inline-block;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M448,192l-128,96v-64H128v128h248c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8V168c0-4.4,3.6-8,8-8h248V96 L448,192z"></path></svg></span>') + '\',' + nl
                         + '    reputationPrecision: ' + this.reputationPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + ',' + nl
                         + '    dateCallback: function (date) {return moment.utc(date).from(moment.utc().format(\'YYYY-MM-DD HH:mm:ss\'));}' + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
                case 'feed':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;blurt-widgets-feed&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('blurt-feed-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptBlurtjs) + nl
                         + this.encodeHTML(this.scriptBlurtWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  blurtWidgets.feed({' + nl
                         + '    element: \'blurt-widgets-feed\',' + nl
                         + '    user: \'' + this.user + '\',' + nl
                         + '    limit: ' + this.limit + ',' + nl
                         + '    template: \'' + this.encodeHTML(template) + '\',' + nl
                         + '    reblurtedIndicator: \'' + this.encodeHTML('<span style="width: 15px; height: 15px; display: inline-block;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M448,192l-128,96v-64H128v128h248c4.4,0,8,3.6,8,8v48c0,4.4-3.6,8-8,8H72c-4.4,0-8-3.6-8-8V168c0-4.4,3.6-8,8-8h248V96 L448,192z"></path></svg></span>') + '\',' + nl
                         + '    reputationPrecision: ' + this.reputationPrecision + ',' + nl
                         + '    updateInterval: ' + this.updateInterval + ',' + nl
                         + '    dateCallback: function (date) {return moment.utc(date).from(moment.utc().format(\'YYYY-MM-DD HH:mm:ss\'));}' + nl
                         + '  });' + nl
                         + '&lt;/script&gt;'
                    ;

                    codeScriptsContainer.html('<pre><code class="html hljs xml">' + code + '</code></pre>');
                    break;
                case 'new':
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;blurt-widgets-new&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('blurt-newhottrending-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptBlurtjs) + nl
                         + this.encodeHTML(this.scriptBlurtWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  blurtWidgets.new({' + nl
                         + '    element: \'blurt-widgets-new\',' + nl
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
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;blurt-widgets-hot&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('blurt-newhottrending-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptBlurtjs) + nl
                         + this.encodeHTML(this.scriptBlurtWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  blurtWidgets.hot({' + nl
                         + '    element: \'blurt-widgets-hot\',' + nl
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
                    codeWidgetContainer.html('<pre><code class="html hljs xml">&lt;div id=&quot;blurt-widgets-trending&quot;&gt;&lt;/div&gt;</code></pre>');

                    var template = document.getElementById('blurt-newhottrending-template-' + this.template).innerHTML.replace(/&quot;/g, '\\\'').replace(/\n/g, '');

                    code = this.encodeHTML(this.scriptBlurtjs) + nl
                         + this.encodeHTML(this.scriptBlurtWidgets) + nl
                         + this.encodeHTML(this.scriptMomentjs) + nl
                         + '&lt;script&gt;' + nl
                         + '  blurtWidgets.trending({' + nl
                         + '    element: \'blurt-widgets-trending\',' + nl
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
            blurtWidgets.updateIntervals.map(intervalId => clearInterval(intervalId));
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
