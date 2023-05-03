export function paginationData() {
    return {
        sorting: "",
        page: 1,
        total: null,
        perPage: 3,
        perPageOptions: [1, 2, 3, 10, 20, 30, 50],
    };
}
export function paginationHelperMethods(searchString, sortingColumnMap) {
    return {
        handleSortChange(ctx) {
            console.log('sorting');
            if (!ctx.sortBy) return (this.pagination.sorting = "");

            const order = ctx.sortDesc ? "desc" : "asc";
            this.pagination.sorting = `${
                sortingColumnMap[ctx.sortBy]
            },${order}`;
        },
        generateParams() {
            const params = new URLSearchParams(window.location.search);

            params.set("page", this.pagination.page);
            params.set("perPage", this.pagination.perPage);
            if (this.filter) {
                params.set(searchString, this.filter);
            } else {
                params.delete(searchString);
            }

            if (this.pagination.sorting) {
                const [col, ord] = this.pagination.sorting.split(",");
                params.set("sort[column]", col);
                params.set("sort[direction]", ord);
            } else {
                params.delete("sort[column]");
                params.delete("sort[direction]");
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

            if (searchParams.has("sort[column]")) {
                const col = searchParams.get("sort[column]");
                const ord = searchParams.get("sort[direction]");
                this.pagination.sorting = `${col},${ord}`;
            }
        },
        getParams() {
            const params = new URLSearchParams();
            if (this.filter) {
                params.append(searchString, this.filter);
            }

            if (this.pagination.sorting) {
                const [col, ord] = this.pagination.sorting.split(",");
                params.append("sort[column]", col);
                params.append("sort[direction]", ord);
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
        "pagination.sorting": {
            async handler(val) {
                this.pagination.page = 1;

                this.generateParams();
                await this[fName]();
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
