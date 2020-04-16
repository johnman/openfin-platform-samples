

fin.Platform.init({
    overrideCallback: async (Provider) => {
        class Override extends Provider {
        };
        return new Override();
    }
});
