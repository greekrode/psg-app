export default {
	
	filterTycoonsByType: async (dataSet, value) => {
		const filteredList = dataSet.filter(item => item.entity_name.toLowerCase().includes(value.toLowerCase()));
		const uniqueTycoonIds = [...new Set(filteredList.map(item => item.tycoon_id))];
		return uniqueTycoonIds;
	},

	filteredData: async () => {
		const majorityOwn = await getMajorityOwn.run();
		const prevOwn = await getPrevOwn.run();
		const securities = await getSecurities.run();
		const investee = await getInvestees.run();
		const tycoons = await getTycoons.run();
		const value = filterInput.text;
		const type = filterType.selectedOptionValue;
		let uniqueTycoonIds;
		
		switch (type) {
            case "mo":
                uniqueTycoonIds = await this.filterTycoonsByType(majorityOwn, value);
                break;
            case "po":
                uniqueTycoonIds = await this.filterTycoonsByType(prevOwn, value);
                break;
            case "s":
                uniqueTycoonIds = await this.filterTycoonsByType(securities, value);
                break;
            case "i":
                uniqueTycoonIds = await this.filterTycoonsByType(investee, value);
                break;
            default:
                return tycoons;
        }
		
		return tycoons.filter(tycoon => uniqueTycoonIds.includes(tycoon.tycoon_id));
	},
	
	filterTypes: async () => {
		return {
			type: [
				{
					name: "Majority Ownership",
					code: "mo",
				},
				{
					name: "Previous Ownership",
					code: "po",
				},
				{
					name: "Securities",
					code: "s",
				},
				{
					name: "Investee",
					code: "i",
				},
			]
		}
	}
}