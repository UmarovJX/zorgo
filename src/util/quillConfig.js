export default {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "link"], // toggled buttons
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme

            [
                { list: "ordered" },
                { list: "bullet" },
                // { indent: "-1" },
                // { indent: "+1" },
            ],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ align: [] }],

            // ["image"],

            ["clean"], // remove formatting button
        ],
    },
};
