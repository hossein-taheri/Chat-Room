const PORT = process.env.PORT || 3000

module.exports = (http) => {
    http.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`);
    });
}