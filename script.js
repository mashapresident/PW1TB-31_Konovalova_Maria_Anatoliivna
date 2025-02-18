function calculateFuelComposition1() {
    let hP = parseFloat(document.getElementById('hP').value) || 0;
    let cP = parseFloat(document.getElementById('cP').value) || 0;
    let sP = parseFloat(document.getElementById('sP').value) || 0;
    let nP = parseFloat(document.getElementById('nP').value) || 0;
    let oP = parseFloat(document.getElementById('oP').value) || 0;
    let wP = parseFloat(document.getElementById('wP').value) || 0;
    let aP = parseFloat(document.getElementById('aP').value) || 0;

    let total = consist(hP, cP, sP, nP, oP, wP, aP);
    if (parseFloat(total) !== 100) {
        document.getElementById('results').innerHTML = `<h3 style='color:red;'>Помилка: сума компонентів має дорівнювати 100%. Зараз: ${total}%</h3>`;
        return;
    }

    let kRS = 100 / (100 - wP);
    let kRG = 100 / (100 - wP - aP);

    let hS = (hP * kRS).toFixed(2);
    let cS = (cP * kRS).toFixed(2);
    let sS = (sP * kRS).toFixed(2);
    let nS = (nP * kRS).toFixed(2);
    let oS = (oP * kRS).toFixed(2);
    let aS = (aP * kRS).toFixed(2);

    let hG = (hP * kRG).toFixed(2);
    let cG = (cP * kRG).toFixed(2);
    let sG = (sP * kRG).toFixed(2);
    let nG = (nP * kRG).toFixed(2);
    let oG = (oP * kRG).toFixed(2);

    let QPH = 339 * cP + 1030 * hP - 108.8 * (oP - sP) - 25 * wP;
    let QSH = ((QPH + 0.025 * wP) * kRS).toFixed(2);
    let QGH = ((QPH + 0.025 * wP) * kRG).toFixed(2);

    document.getElementById('results').innerHTML = `
        <h3>Результати розрахунку</h3>
        <p>Для палива з компонентним складом: H<sup>P</sup>=${hP}%; C<sup>P</sup>=${cP}%; S<sup>P</sup>=${sP}%; N<sup>P</sup>=${nP}%; O<sup>P</sup>=${oP}%; W<sup>P</sup>=${wP}%; A<sup>P</sup>=${aP}%;</p>
        <p>1. Коефіцієнт переходу від робочої до сухої маси становить: ${kRS.toFixed(2)};</p>
        <p>2. Коефіцієнт переходу від робочої до горючої маси становить: ${kRG.toFixed(2)};</p>
        <p>3. Склад сухої маси палива становитиме: H<sup>С</sup>=${hS}%; C<sup>С</sup>=${cS}%; S<sup>С</sup>=${sS}%; N<sup>С</sup>=${nS}%; O<sup>С</sup>=${oS}%; A<sup>С</sup>=${aS}%;</p>
        <p>4. Склад горючої маси палива становитиме: H<sup>Г</sup>=${hG}%; C<sup>Г</sup>=${cG}%; S<sup>Г</sup>=${sG}%; N<sup>Г</sup>=${nG}%; O<sup>Г</sup>=${oG}%;</p>
        <p>5. Нижча теплота згоряння для робочої маси за заданим складом компонентів палива становить: ${QPH.toFixed(2)} МДж/кг;</p>
        <p>6. Нижча теплота згоряння для сухої маси за заданим складом компонентів палива становить: ${QSH} МДж/кг;</p>
        <p>7. Нижча теплота згоряння для горючої маси за заданим складом компонентів палива становить: ${QGH} МДж/кг.</p>
    `;
}


function calculateFuelComposition2() {
    let cG = parseFloat(document.getElementById('cG').value) || 0;
    let hG = parseFloat(document.getElementById('hG').value) || 0;
    let oG = parseFloat(document.getElementById('oG').value) || 0;
    let sG = parseFloat(document.getElementById('sG').value) || 0;
    let qDaf = parseFloat(document.getElementById('qDaf').value) || 0;
    let wG = parseFloat(document.getElementById('wG').value) || 0;
    let aG = parseFloat(document.getElementById('aG').value) || 0;
    let vG = parseFloat(document.getElementById('vG').value) || 0;

    let kRG = (100 - wG - aG) / 100;
    let cR = (cG * kRG).toFixed(2);
    let hR = (hG * kRG).toFixed(2);
    let oR = (oG * kRG).toFixed(2);
    let sR = (sG * kRG).toFixed(2);
    let vR = (vG * (100 - wG) / 100).toFixed(2);
    let aR = aG.toFixed(2);
    let qR = (qDaf * (100 - wG - aG) / 100 - 0.025 * wG).toFixed(2);

    document.getElementById('results').innerHTML = `
                <h3>Результати розрахунку</h3>
                <p>1. Склад робочої маси мазуту : C<sup>Р</sup>=${cR}%; H<sup>Р</sup>=${hR}%; O<sup>Р</sup>=${oR}%; S<sup>Р</sup>=${sR}%; V<sup>Р</sup>=${vR} мг/кг; A<sup>Р</sup>=${aR}%;</p>
                <p>2. Нижча теплота згоряння мазуту на робочу масу: ${qR} МДж/кг.</p>
                `;
}

function consist(h, c, s, n, o, w, a) {
    return (h + c + s + n + o + w + a).toFixed(2);
}
