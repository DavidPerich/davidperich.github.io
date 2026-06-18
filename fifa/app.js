let activeFilter = null;

function formatMatchTime(utcStr) {
    const date = new Date(utcStr);
    return date.toLocaleString(navigator.language, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function renderFixtures() {
    const tbody = document.getElementById("fixtures-tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";

    const filteredMatches = activeFilter 
        ? UPCOMING_MATCHES.filter(m => TEAM_OWNERS[m.homeTeam.id] === activeFilter || TEAM_OWNERS[m.awayTeam.id] === activeFilter)
        : UPCOMING_MATCHES;

    if (filteredMatches.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="text-center" style="color: var(--text-muted); padding: 2rem;">No upcoming matches found ${activeFilter ? "for this participant" : ""}.</td></tr>`;
        return;
    }

    filteredMatches.forEach(m => {
        const pHome = TEAM_OWNERS[m.homeTeam.id] || "None";
        const pAway = TEAM_OWNERS[m.awayTeam.id] || "None";
        
        const homeBadgeClass = pHome === activeFilter ? "p-badge active-filter" : "p-badge";
        const awayBadgeClass = pAway === activeFilter ? "p-badge active-filter" : "p-badge";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fixture-time">${formatMatchTime(m.utcDate)}</td>
            <td>
                <div class="matchup-wrapper">
                    <img src="${m.homeTeam.crest}" alt="${m.homeTeam.name}" class="matchup-crest" onerror="this.src='https://crests.football-data.org/wm26.png'">
                    <span class="matchup-team">${m.homeTeam.name}</span>
                    <span class="badge-vs">vs</span>
                    <img src="${m.awayTeam.crest}" alt="${m.awayTeam.name}" class="matchup-crest" onerror="this.src='https://crests.football-data.org/wm26.png'">
                    <span class="matchup-team">${m.awayTeam.name}</span>
                </div>
            </td>
            <td class="interest-col">
                <div class="interest-badge-wrapper">
                    <span class="${homeBadgeClass}" onclick="filterFromBadge('${pHome}', event)">${pHome}</span>
                    <span class="badge-vs">vs</span>
                    <span class="${awayBadgeClass}" onclick="filterFromBadge('${pAway}', event)">${pAway}</span>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function filterFromBadge(participantName, event) {
    if (event) event.stopPropagation();
    if (participantName === "None" || !participantName) return;
    
    const rows = document.querySelectorAll("#leaderboard-card .leaderboard-table tbody tr");
    const targetRow = Array.from(rows).find(row => row.getAttribute("data-participant") === participantName);
    if (targetRow) {
        setFilter(participantName, targetRow);
    }
}

function setFilter(participantName, clickedRow) {
    const rows = document.querySelectorAll("#leaderboard-card .leaderboard-table tbody tr");
    
    if (activeFilter === participantName) {
        clearFilter();
        return;
    }

    activeFilter = participantName;
    document.getElementById("filtered-participant-name").textContent = participantName;
    document.getElementById("filter-indicator").classList.add("active");

    rows.forEach(row => {
        if (row === clickedRow) {
            row.classList.add("active-filter-row");
            row.classList.remove("dimmed");
        } else {
            row.classList.remove("active-filter-row");
            row.classList.add("dimmed");
        }
    });

    renderFixtures();
}

function clearFilter() {
    activeFilter = null;
    document.getElementById("filter-indicator").classList.remove("active");
    
    const rows = document.querySelectorAll("#leaderboard-card .leaderboard-table tbody tr");
    rows.forEach(row => {
        row.classList.remove("active-filter-row", "dimmed");
    });

    renderFixtures();
}

document.addEventListener("DOMContentLoaded", () => {
    // Bind click listeners to participant rows
    const mainTableRows = document.querySelectorAll("#leaderboard-card .leaderboard-table tbody tr");
    mainTableRows.forEach(row => {
        const name = row.getAttribute("data-participant");
        if (name) {
            row.addEventListener("click", () => setFilter(name, row));
        }
    });

    const clearBtn = document.getElementById("clear-filter");
    if (clearBtn) {
        clearBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            clearFilter();
        });
    }

    renderFixtures();
});
