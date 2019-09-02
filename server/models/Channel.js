class Channel {
    constructor(
      channelName,
      description,
      groupList,
    ) {
      this.channelName = channelName;
      this.description = description;
      this.groupList = groupList;
    }
  }
  
  module.exports = {
    Channel,
  };
  