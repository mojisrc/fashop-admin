// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
    // return localStorage.getItem('fashop-authority') || ['admin', 'user'];
    const authorityString =
        typeof str === "undefined" ? localStorage.getItem("fashop-authority") : str;
    // authorityString could be admin, "admin", ["admin"]
    let authority;
    try {
        authority = JSON.parse(authorityString);
    } catch (e) {
        authority = authorityString;
    }
    if (typeof authority === "string") {
        return [authority];
    }
    return authority || ["guest"];
}

export function setAuthority(authority) {
    const proAuthority = typeof authority === "string" ? [authority] : authority;
    return localStorage.setItem("fashop-authority", JSON.stringify(proAuthority));
}
