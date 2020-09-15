const tooltip = document.getElementById("tooltip");

const width = 900;
const height = 600;

const kickstarterDataSource =
	"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
let kickstarterData = "";

fetch(kickstarterDataSource)
	.then((res) => res.json())
	.then((data) => {
		kickstarterData = JSON.parse(JSON.stringify(data));
		console.log(kickstarterData);
		createTreeMap(kickstarterData);
	});

const svg = d3
	.select("#container")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

const createTreeMap = (data) => {
	const color = d3.scaleOrdinal(d3.schemeCategory10);

	const root = d3.hierarchy(data).sum((d) => d.value);

	console.log(root.leaves());

	d3.treemap().size([width, height]).padding(1)(root);

	const cell = svg
		.selectAll("g")
		.data(root.leaves())
		.enter()
		.append("g")
		.attr("transform", (d) => `translate(${d.x0}, ${d.y0})`);

	cell
		.append("rect")
		.attr("class", "tile")
		.attr("id", (d) => d.data.id)
		.attr("data-name", (d) => d.data.name)
		.attr("data-category", (d) => d.data.category)
		.attr("data-value", (d) => d.data.value)
		.attr("width", (d) => d.x1 - d.x0)
		.attr("height", (d) => d.y1 - d.y0)
		.attr("fill", (d) => color(d.data.category));

	cell
		.append("text")
		.selectAll("tspan")
		.data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
		.enter()
		.append("tspan")
		.attr("style", "font-size: 13px")
		.attr("x", 4)
		.attr("y", (d, i) => 15 + i * 15)
		.text((d) => d);
};
