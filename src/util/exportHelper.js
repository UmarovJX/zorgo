export function exportHelperData() {
    return {
        dateFrom: "",
        dateTo: "",
        companyId: null,
        companyOptions: [],
        isExporting: false,
    };
}

export function exportHelperFunctions(api, path, fileName) {
    return {
        clearModal() {
            this.isExporting = false;
            this.dateFrom = "";
            this.dateTo = "";
            this.companyId = null;
        },
        async exportData() {
            this.isExporting = true;
            this.$bvModal.hide(`modal-export`);
            const params = {};

            if (this.dateFrom) {
                if (!this.dateTo) {
                    this.showToast("danger", "Укажите конечную дату!", "XIcon");
                    this.clearModal();
                    return;
                }
                params["filters[created_at][0]"] = new Date(this.dateFrom)
                    .toLocaleString("ru")
                    .slice(0, 10);
                params["filters[created_at][1]"] = new Date(this.dateTo)
                    .toLocaleString("ru")
                    .slice(0, 10);
            }

            if (this.companyId) {
                params["filters[policy.company_id]"] = this.companyId;
            }

            const urlParams = new URLSearchParams(params);
            const urlString = urlParams.toString();

            const url =
                api.getBaseURL() + path + (urlString ? "?" + urlString : "");
            fetch(url, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            })
                .then((response) => response.blob())
                .then((blob) => {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.href = url;
                    a.download = fileName + ".xlsx";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    this.clearModal();
                })
                .catch(() => {
                    this.showToast("danger", "Что-то пошло не так!", "XIcon");
                    this.clearModal();
                });
        },
    };
}
