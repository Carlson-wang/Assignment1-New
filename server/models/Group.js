class Group {
    constructor(
        groupName,
        description,
        channelList,
    ){
        this.groupName = groupName;
        this.description = description;
        this.channelList = channelList;
    }
}

module.exports = {
    Group,
};