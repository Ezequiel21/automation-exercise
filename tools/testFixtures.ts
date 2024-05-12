const base = require("@playwright/test");
import { pages as pageInit} from "../POM/pages/pageInitializer.page";

exports.test = base.test.extend({
    pages: async ({ page }, use) => {
        const pages = pageInit(page);
        await use(pages);
    }
});
