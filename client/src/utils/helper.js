export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const getInitials = (name) => {
    if (!name) {
        return "";
    }

    const nameArray = name.split(" ");
    let initials = "";

    for (let i = 0; i < nameArray.length; i++) {
        initials += nameArray[i].charAt(0);
    }

    return initials.toUpperCase();
}