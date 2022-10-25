// const query = "SP/SÃO PAULO";

function dataToTable({ index, data }) {
	const table = document.getElementById("data-viewer-table");

	if (index == 0) {
		let tr = document.createElement("tr");
		data.slice(3).map((datum, index) => {
			let th = document.createElement("th");
			if (index > 2 && index < 7) {
				// var img = document.createElement("img");
				// img.src = `./assets/images/${datum}.png`;
				var text = document.createElement("p");
				text.innerHTML = datum;
				// th.append(img);
				th.append(text);
				tr.append(th);
			} else if (datum == "BAIRRO/LOCALIDADE") {
				th.innerHTML = "Bairros";
				tr.append(th);
			} else if (datum == "ANTI-LULA") {
				th.innerHTML = "Não votou no Lula";
				tr.append(th);
			} else if (datum == "VALIDOS") {
				th.innerHTML = "Votos Válidos";
				tr.append(th);
			} else {
				th.innerHTML = datum;
				tr.append(th);
			}
		});
		table.append(tr);
	} else {
		let tr = document.createElement("tr");
		data.slice(3).map((datum, index) => {
			let td = document.createElement("td");
			if (index == 0) {
				td.innerHTML = datum;
				tr.append(td);
			} else if (index == 1) {
				let number = 1-Number(datum).toFixed(2);
				td.innerHTML = number.toLocaleString("pt-BR");
				td.setAttribute("data-type", "number");
				tr.append(td);
			} else if (index > 2 && index < 8) {
				let number = Number(datum) * 100;
				td.innerHTML = number.toLocaleString("pt-BR") + "%";
				td.setAttribute("data-type", "number");
				tr.append(td);
			}else if(index ==8){
				let number = (1-Number(datum)) * 100;
				td.innerHTML = number.toLocaleString("pt-BR") + "%";
				td.setAttribute("data-type", "number");
				tr.append(td);
			} else {
				let number = Number(datum);
				td.innerHTML = number.toLocaleString("pt-BR");
				td.setAttribute("data-type", "number");
				tr.append(td);
			}
		});
		table.append(tr);
	}
}

function loadData(query) {
	Papa.parse(`https://rickrribeiro.github.io/data/csv/${query}.csv`, {
		download: true,
		complete: function (results) {
			const tableSection = document.getElementById("data-viewer");
			let tableViewer = document.createElement("table");
			tableViewer.setAttribute("id", "data-viewer-table");
			tableSection.append(tableViewer);
			results.data.map((result, index) => {
				dataToTable({ data: result, index: index });
			});
			tableViewer.scrollIntoView();
		},
	});


}

function setupSelect() {
	/*
	Selects an object with the UF, cities relationship
	and creates two selectors based on it.
	*/

	Promise.all([d3.json("./data/estrutura-seletores.json")]).then((data) => {
		// I want it to be an object, not array
		data = data[0];
		let states = Object.keys(data);

		// Selects the state selector
		let stateSelector = document.querySelector("#uf-select");
		// Selects the city selector
		let citySelector = document.querySelector("#city-select");

		for (index in states) {
			var state = states[index];
			var opt = document.createElement("option");
			opt.value = state;
			opt.innerHTML = state;
			stateSelector.appendChild(opt);
		}

		// Once the user selects a state, we unlock and fill the city
		stateSelector.addEventListener("change", function (d) {

			let tableViewer = document.querySelector("#data-viewer-table");
			tableViewer?.remove();

			// Selects the value
			var value = stateSelector.options[stateSelector.selectedIndex].value;

			// Gets the city values
			var cities = data[value];

			// Removes existing stuff
			citySelector.innerHTML = "";

			// Adds a placeholder
			var opt = document.createElement("option");
			opt.value = "placeholder";
			opt.innerHTML = "Selecione sua cidade";
			citySelector.appendChild(opt);

			// Populates with city values
			for (index in cities) {
				var city = cities[index];
				var opt = document.createElement("option");

				opt.value = city.TSE;
				opt.innerHTML = city.municipio;
				citySelector.appendChild(opt);
			}

			// Unlocks
			citySelector.disabled = false;
		});

		citySelector.addEventListener("change", function (d) {
			// Selects the value
			var value = citySelector.options[citySelector.selectedIndex].value;
			var name = citySelector.options[citySelector.selectedIndex].innerHTML;
			let tableViewer = document.querySelector("#data-viewer-table");
			tableViewer?.remove();

			console.log(value);
			loadData(value);

		});
	});
}

setupSelect();
