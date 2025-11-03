console.log("JS connected");

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#nav-buttons");
  const container = document.querySelector("#senator-container");

  const filters = [
    { label: "All Senators", filter: () => true },
    { label: "Democrats", filter: s => s.party === "D" },
    { label: "Republicans", filter: s => s.party === "R" },
    { label: "Women", filter: s => s.gender === "F" },
    { label: "Up for Re-election (2024)", filter: s => s.next_election === "2024" }
  ];

 
  filters.forEach(({ label, filter }, index) => {
    const button = document.createElement("button");
    button.textContent = label;

    button.addEventListener("click", () => {
      setActiveButton(button);
      displaySenators(senators.filter(filter));
    });

    nav.appendChild(button);
    if (index === 0) button.classList.add("active");
  });

  
  function displaySenators(list) {
    container.innerHTML = "";

    list.forEach(sen => {
      const card = document.createElement("div");
      card.classList.add("card");

      if (sen.party === "D") card.classList.add("democrat");
      else if (sen.party === "R") card.classList.add("republican");
      else card.classList.add("independent");

      const imgURL = `https://unitedstates.github.io/images/congress/225x275/${sen.id}.jpg`;

      card.innerHTML = `
        <img src="${imgURL}" alt="${sen.first_name} ${sen.last_name}">
        <h3>${sen.first_name} ${sen.last_name}</h3>
        <p><strong>Party:</strong> ${sen.party}</p>
        <p><strong>State:</strong> ${sen.state}</p>
        <p><strong>Next Election:</strong> ${sen.next_election}</p>
        <p><a href="${sen.url}" target="_blank">Official Website</a></p>
      `;

      container.appendChild(card);
    });
  }

 
  function setActiveButton(activeBtn) {
    document.querySelectorAll("#nav-buttons button").forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
  }

 
  displaySenators(senators);
});
