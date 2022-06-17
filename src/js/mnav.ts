import MoreNav from "./modules/MoreNav";

/* TODO: 
add config options and pass them into more toggle

OPTIONS:
    * work on page load and on screen resize re calculate if more is needed
    * custom drop down option
    * hide if screen size is smaller than X
    * dropdown item class (switch when in dropdown and remove when not in dropdown)
    * regular item class (switch back to it when removed from dropdown)
*/

new MoreNav('[data-mnav]');