/**
 * recipe-calculator.js - Verbesserte Version mit formatierter Anzeige und grünen Zahlen
 */

document.addEventListener('DOMContentLoaded', function() {
    // Definiere die Grundzutaten für 4 Personen (Standardwert)
    const baseIngredients = [
        { amount: 4, unit: '', name: 'Chilischote(n), rote, frische', scalable: true },
        { amount: 500, unit: 'g', name: 'Hähnchenbrustfilet(s)', scalable: true },
        { amount: 3, unit: '', name: 'Frühlingszwiebel(n)', scalable: true },
        { amount: 1, unit: 'Zehe/n', name: 'Knoblauch', scalable: true },
        { amount: 1, unit: 'Stück(e)', name: 'Ingwer, ca. 2 cm', scalable: true },
        { amount: 4, unit: 'EL', name: 'Öl (Erdnussöl)', scalable: true },
        { amount: 3, unit: '', name: 'Chilischote(n), rote, getrocknet', scalable: true },
        { amount: 80, unit: 'g', name: 'Erdnüsse, geröstet', scalable: true },
        { amount: 3, unit: 'EL', name: 'Reiswein', scalable: true },
        { amount: 2, unit: 'EL', name: 'Sojasauce', scalable: true },
        { amount: 1, unit: 'EL', name: 'Zucker', scalable: true },
        { amount: 1, unit: 'EL', name: 'Essig (Apfelessig)', scalable: true },
        { amount: 2, unit: 'EL', name: 'Öl (Sesamöl)', scalable: true },
        { amount: '', unit: '', name: 'Salz', scalable: false }
    ];
    
    const portionsInput = document.getElementById('portions');
    const portionsButton = document.querySelector('.portions-button');
    const ingredientsList = document.getElementById('ingredients-list');
    
    // Initialisiere die Tabelle beim ersten Laden
    updateIngredients(4);
    
    // Event-Listener für den Button
    portionsButton.addEventListener('click', function() {
        const portions = parseInt(portionsInput.value, 10);
        if (portions >= 1 && portions <= 20) {
            updateIngredients(portions);
        } else {
            alert('Bitte gib eine Zahl zwischen 1 und 20 ein.');
            portionsInput.value = 4;
            updateIngredients(4);
        }
    });
    
    // Event-Listener für Eingabefeldänderungen mit Enter-Taste
    portionsInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const portions = parseInt(portionsInput.value, 10);
            if (portions >= 1 && portions <= 20) {
                updateIngredients(portions);
            } else {
                alert('Bitte gib eine Zahl zwischen 1 und 20 ein.');
                portionsInput.value = 4;
                updateIngredients(4);
            }
        }
    });
    
    /**
     * Aktualisiert die Zutatenliste basierend auf der Anzahl der Portionen
     * @param {number} portions - Anzahl der Portionen
     */
    function updateIngredients(portions) {
        // Leere die bestehende Tabelle
        ingredientsList.innerHTML = '';
        
        // Berechne den Faktor für die Skalierung
        const scaleFactor = portions / 4;
        
        // Aktualisiere jede Zeile in der Tabelle
        baseIngredients.forEach((ingredient, index) => {
            // Erstelle eine neue Tabellenzeile
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            
            // Füge Zebra-Streifen-Effekt basierend auf dem Index hinzu
            row.className = index % 2 === 0 ? 'row-even' : 'row-odd';
            
            // Berechne die neue Menge, wenn die Zutat skalierbar ist
            let displayHTML = '';
            
            if (ingredient.scalable && ingredient.amount) {
                const newAmount = ingredient.amount * scaleFactor;
                
                // Formatiere die Zahlen: runde auf 1 Nachkommastelle und entferne sie, wenn es eine ganze Zahl ist
                let displayAmount = Math.round(newAmount * 10) / 10;
                displayAmount = displayAmount % 1 === 0 ? displayAmount.toFixed(0) : displayAmount.toFixed(1);
                
                // Füge die formatierte Menge mit grüner Farbe hinzu
                displayHTML += `<span class="ingredient-quantity">${displayAmount}</span>`;
                
                if (ingredient.unit) {
                    displayHTML += `<span class="ingredient-unit">${ingredient.unit}</span> `;
                } else {
                    displayHTML += ' ';
                }
            }
            
            // Setze den Zelleninhalt zusammen
            displayHTML += ingredient.name;
            cell.innerHTML = displayHTML;
            
            // Füge die Zelle zur Zeile und die Zeile zur Tabelle hinzu
            row.appendChild(cell);
            ingredientsList.appendChild(row);
        });
    }
});