// Current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Last modified date
const lastMod = document.lastModified;

document.getElementById("lastModified").textContent = `Last Modification: ${lastMod}`;


