require('intersection-observer');

export default class MoreNav {

    private $navigationContainer: JQuery<HTMLElement>; // Main navigation wrapper data-mnav

    private $moreContainer: JQuery<HTMLElement>; // More navigation, default - data-mnav-dropdown
    private moreContainerSelector: HTMLElement; // More navigation selector for intersection observer
    private $moreContainerNavList: JQuery<HTMLElement>; // More dropdown ul container list default - data-mnav-dropdown-list
    private moreNavItemCount: number; // More dropdown items

    private $originalNavList: JQuery<HTMLElement>; // Original navigation ul container default - data-mnav-list
    private originalNavListSelector: HTMLElement; // Original navigation ul container selector- data-mnav-list
    private $navigationItem: JQuery<HTMLElement>; // Navigation list item

    private observerConfig: Object; // observer config object

    private navigationContainerWidth: number; // Navigation width;
    private navigationItemWidth: Array<any>; // Array of each individual navigation item width
    private totalItemWidth: number; // Total width of navigation items taken from navigationItemWidth array
    private totalNavigationItemWidth: number; // Navigation item total width

    constructor(navigationContainer: string) {
        this.$navigationContainer = $(navigationContainer);

        this.$moreContainer = $('[data-mnav-dropdown]');
        this.moreContainerSelector = document.querySelector('[data-mnav-dropdown]');
        this.$moreContainerNavList = $('[data-mnav-dropdown-list]');

        this.moreNavItemCount = 0;

        this.$originalNavList = $('[data-mnav-list]');
        this.originalNavListSelector = document.querySelector('[data-mnav-list]'); // element for intersection observer

        this.$navigationItem = this.$originalNavList.find('[data-mnav-item]');

        this.navigationContainerWidth = 0;
        this.totalItemWidth = 0;
        this.navigationItemWidth = new Array;
        this.totalNavigationItemWidth = 0;

        this.observerConfig = {
            root: document.querySelector(navigationContainer),
            rootMargin: "10px", // margin between firing
            threshold: [0.0, 1]
        };

        this.init();
    }

    private init() {
        this.navigationContainerWidth = this.$navigationContainer.width(); // navigation length
        this.$navigationItem.each((index, element) => {
            this.navigationItemWidth.push($(element).outerWidth(true));
        });

        this.navigationItemWidth.map((element) => {
            this.totalItemWidth += element;
        });
    
        this.intersectionObserver(this.originalNavListSelector);
        this.windowResizeListener();
    }

    private intersectionObserver(element: HTMLElement) {
        const _that = this; // for arrow function usage in observer
        let observer = new IntersectionObserver(observeFn, this.observerConfig); // intersection observer
        setTimeout(() => { // Timeout to load full navigation
            observer.observe(element); // observe on load if last nav item fits menu
        }, 300);

        function observeFn(entry, observer) {
            if(entry[0].intersectionRatio < 1) { 
                // if navigation doesn't fit inside navigation container
                _that.addToMoreNavigation(); // call more navigation
            }
            observer.unobserve(entry[0].target); // stop observing element
        }
        observer.disconnect(); // precaution to stop observing all elements
    }

    private addToMoreNavigation() {
        this.$moreContainer.show(); // show more dropdown
        this.moreNavItemCount = this.$moreContainerNavList.find('li').length;  // update more item count
        const $lastNavItem = this.$originalNavList.find('[data-mnav-item]').last();
        
        if(this.moreNavItemCount < 1) { // more dropdown is empty
             // add last navigation item to more dropdown
             this.$moreContainerNavList.append($lastNavItem);
        } else { // more dropdown is not empty
            // add element before first - so it creates correct order
            this.$moreContainerNavList.find('li').first().before($lastNavItem);
        }
        this.moreNavItemCount = this.$moreContainerNavList.find('li').length;  // update more item count
        this.$moreContainerNavList.find('li').removeClass('navigation-item').addClass('navigation-childrens-item');
        this.$moreContainerNavList.find('li').removeAttr('data-mnav-item');
        this.$navigationItem = this.$originalNavList.find('[data-mnav-item]'); // update navigation items
        this.intersectionObserver(this.moreContainerSelector); // observe if more dropdown fits in nav container
    }

    private removeFromMoreNavigation() {
        const $firstNavItem = this.$moreContainerNavList.find('li').first();
        this.moreNavItemCount = this.$moreContainerNavList.find('li').length; // update more item count
        const firstDropdownItem = this.navigationItemWidth.length - this.moreNavItemCount;
        const navigationAppendAndMoreWidth = this.totalNavigationItemWidth + this.navigationItemWidth[firstDropdownItem] + this.$moreContainer.outerWidth(true);
        
        if (this.moreNavItemCount === 1 && this.totalItemWidth <= this.navigationContainerWidth) { 
            // more has one item & if dropdown item can fit within navigation
            $firstNavItem.addClass('navigation-item').removeClass('navigation-childrens-item').attr('data-mnav-item', '');
            this.$originalNavList.append($firstNavItem);
            this.moreNavItemCount = this.$moreContainerNavList.find('li').length; // update more item count
             // add last navigation item to more dropdown
             this.$moreContainer.hide(); // show more dropdown
        } else if (this.moreNavItemCount > 1 && navigationAppendAndMoreWidth <= this.navigationContainerWidth) { 
            // more has two or more items
            $firstNavItem.addClass('navigation-item').removeClass('navigation-childrens-item').attr('data-mnav-item', '');
            $firstNavItem.insertBefore('[data-mnav-dropdown]');
            this.moreNavItemCount = this.$moreContainerNavList.find('li').length; // update more item count
        }
        this.$navigationItem = this.$originalNavList.find('[data-mnav-item]'); // update navigation items
    }

    private moreNavigationResize(totalNavigationLength: number) {
        // totalNavigationLength = navigation items + more dropdown length

        if (totalNavigationLength > this.navigationContainerWidth) {
            // if more is visible & total navigation lenght is greater than navigation container
            this.addToMoreNavigation();
        } else if (this.navigationContainerWidth >= totalNavigationLength) {
            // if more is visible & navigation container is greater than total navigation lenght
            this.removeFromMoreNavigation();
        }
    }

    private windowResizeListener() {
        $(window).on('resize', () => {        
            this.navigationContainerWidth = this.$navigationContainer.width(); // navigation length
            const dropdownItemCount = this.$moreContainerNavList.find('li').length;
            this.totalNavigationItemWidth = 0; // reset total navigation item width
            this.$navigationItem.each((index, element) => {                
                this.totalNavigationItemWidth += $(element).outerWidth(true);
            });
            const totalNavigationLength = this.totalNavigationItemWidth + this.$moreContainer.outerWidth(true);
            const firstDropdownItem = this.navigationItemWidth.length - dropdownItemCount;

            if (this.$moreContainer.is(':visible')) {
                // if more is visible & total navigation lenght is greater than navigation container
                this.moreNavigationResize(totalNavigationLength);
            } else if (!this.$moreContainer.is(':visible') && this.navigationContainerWidth < this.totalItemWidth) {
                // if more is visible & navigation container is greater than total navigation lenght
                this.addToMoreNavigation();
            }
        });
    }
}