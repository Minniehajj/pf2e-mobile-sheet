import type { MobileUI } from "./MobileUI.js";
import { warn } from "../utils.js";
import { id as MODULE_ID } from "@static/module.json";

export class MobileMenu extends Application {
	nav: MobileUI;

	constructor(nav: MobileUI) {
		super({
			template: "modules/" + MODULE_ID + "/templates/menu.hbs",
			popOut: false,
		});
		this.nav = nav;
	}

	override activateListeners(html: JQuery<HTMLElement>): void {
		html.find("li").on("click", (evt) => {
			const [firstClass] = evt.currentTarget.className.split(" ");
			const [, name] = firstClass.split("-");
			this.selectItem(name);
		});
	}

	toggleOpen(): void {
		this.element.toggleClass("open");
	}

	selectItem(name: string): void {
		switch (name) {
			case "fullscreen":
				if (document.fullscreenElement) {
					document.exitFullscreen();
				} else {
					document.documentElement.requestFullscreen();
				}
				break;
			case "players":
				game.settings.set(MODULE_ID, "show-player-list", !game.settings.get(MODULE_ID, "show-player-list"));
				break;
			case "canvas":
				game.settings.set(MODULE_ID, "disable-canvas", !game.settings.get(MODULE_ID, "disable-canvas"));
				break;
			case "exit":
				// TODO setSetting(settings.PIN_MOBILE_MODE, false);
				break;
			default:
				warn(true, "Unhandled menu item", name);
				break;
		}
		this.nav.closeDrawer();
	}
}
