export function paginationData() {
    return {
        page: 1,
        total: null,
        perPage: 3,
        perPageOptions: [1, 2, 3, 10, 20, 30, 50],
    };
}
export function paramFunctions(searchString) {
    return {
        generateParams() {
            const params = new URLSearchParams(window.location.search);

            params.set("page", this.pagination.page);
            params.set("perPage", this.pagination.perPage);
            if (this.filter) {
                params.set(searchString, this.filter);
            } else {
                params.delete(searchString);
            }

            let url =
                window.location.href.replace(window.location.href, "?") +
                params.toString();
            window.history.pushState({ path: url }, "", url);
        },

        setParams() {
            const searchParams = new URLSearchParams(window.location.search);
            ["page", "perPage", searchString].forEach((el) => {
                if (searchParams.has(el)) {
                    this.pagination[el] = searchParams.get(el);
                }
            });
        },
        getParams() {
            const params = new URLSearchParams();
            if (this.filter) {
                params.append(searchString, this.filter);
            }

            params.append("page", this.pagination.page);
            params.append("perPage", this.pagination.perPage);

            return params.toString();
        },
    };
}

export function paginationWatchers(fName) {
    return {
        "pagination.page": {
            async handler(val) {
                const params = new URLSearchParams(window.location.search);

                if (val !== params.get("page")) {
                    this.generateParams();
                    await this[fName]();
                }
            },
        },
        filter: {
            async handler() {
                this.pagination.page = 1;
                this.generateParams();
                await this[fName]();
            },
        },
        "pagination.perPage": {
            async handler(val) {
                const params = new URLSearchParams(window.location.search);

                if (val !== params.get("perPage")) {
                    this.pagination.page = 1;

                    this.generateParams();
                    await this[fName]();
                }
            },
        },
    };
}
