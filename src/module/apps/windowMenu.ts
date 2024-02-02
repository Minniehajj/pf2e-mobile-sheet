import { Window } from "./windowManager.js";
import type { MobileUI } from "./MobileUI.js";
import { id as MODULE_ID } from "@static/module.json";

const icons = {
	"": "",
	combat: "fa-fist-raised",
	scenes: "fa-map",
	scene: "fa-map",
	actors: "fa-users",
	actor: "fa-users",
	items: "fa-suitcase",
	item: "fa-suitcase",
	journal: "fa-book-open",
	tables: "fa-th-list",
	playlists: "fa-music",
	compendium: "fa-atlas",
	settings: "fa-cogs",
	npc: "fa-skull",
	character: "fa-user",
	spell: "fa-magic",
	equipment: "fa-tshirt",
	feat: "fa-hand-rock",
	class: "fa-user",
};

export class WindowMenu extends Application {
	list?: JQuery<HTMLElement>;
	nav: MobileUI;

	constructor(nav: MobileUI) {
		super({
			template: "modules/" + MODULE_ID + "/templates/window-selector.hbs",
			popOut: false,
		});
		this.nav = nav;
		Hooks.on("WindowManager:NewRendered", this.windowAdded.bind(this));
		Hooks.on("WindowManager:Removed", this.windowRemoved.bind(this));
	}

	override activateListeners(html: JQuery<HTMLElement>): void {
		this.list = html.find(".window-list");
	}

	// Attempt to discern the title and icon of the window
	winIcon(win: Application): string {
		let windowType: string =
			// @ts-expect-error
			win.icon ||
			// @ts-expect-error
			win.tabName ||
			// @ts-expect-error
			win?.object?.data?.type ||
			// @ts-expect-error
			win?.object?.data?.entity ||
			// @ts-expect-error
			(win.metadata ? "compendium" : "") ||
			"";
		windowType = windowType.toLowerCase();
		return icons[windowType] || windowType;
	}

	newWindow = (win: Window): JQuery<HTMLElement> => {
		const winIcon = this.winIcon(win.app);
		const windowButton = $(
			`<button class="window-select" title="${win.title}"><i class="fas ${winIcon}"></i> ${win.title}</button>`,
		);
		const closeButton = $(`<button class="window-close" title="close"><i class="fas fa-times"></i></button>`);
		const row = $(`<li class="window-row"  data-id="${win.id}"></li>`);
		row.append(windowButton, closeButton);

		windowButton.on("click", (ev) => {
			ev.preventDefault();
			win.show();
			this.nav.closeDrawer();
		});
		closeButton.on("click", (ev) => {
			ev.preventDefault();
			win.close();
		});
		return row;
	};

	windowAdded(appId: number): void {
		this.list?.append(this.newWindow(window.WindowManager.windows[appId]));
		this.update();
	}

	windowRemoved(appId: number): void {
		this.list?.find(`li[data-id="${appId}"]`).remove();
		this.update();
	}

	update(): void {
		const winCount = Object.values(window.WindowManager.windows).length;
		this.nav.setWindowCount(winCount);
	}
}
