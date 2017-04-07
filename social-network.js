var _ = require("underscore");

var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06", "f03", "f04"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03","f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f01"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05", "f03"]
  }
};

function getFollowers(personId){
  var followersIds = [];
  for(var person in data){
    if(data[person].follows.includes(personId)){
      followersIds.push(person);
    }
  }
  return followersIds;
}


function getFollowersArray(personId){
   return _.filter(data, function(person){ return person.follows.includes(personId)});
}


//List everyone and for each of them, list the names of who they follow and who follows them
function followers(){
  for(var person in data){
    var followersString = "";
    followersString += data[person].name + " follows ";
    data[person].follows.forEach(function(follower, index, followers){
      if(index === followers.length - 1 && index !== 0){
        followersString += "and ";
      }
      followersString +=  data[follower].name + " ";
    });
    var followers = getFollowers(person);
    if(followers){
      followersString += ", this are his/her followers "
      followers.forEach(function(follower, index, followers){
        if(index === followers.length - 1 && index !== 0){
          followersString += "and ";
        }
        followersString += data[follower].name + " ";
      });
    }
    console.log(followersString);
  }
}

followers();
//Identify who follows the most people
function mostPeopleFollowing(){
  var maxNumFollowing = 0;
  var mostFollowingPersonId = 0;
  for(var person in data){
    if(maxNumFollowing <= data[person].follows.length){
      maxNumFollowing = data[person].follows.length;
      mostFollowingPersonId = person;
    }
  }
  console.log("The person that follows more people is: " + data[mostFollowingPersonId].name);
}
mostPeopleFollowing();
//Identify who has the most followers
function mostFollowers(){
  var mostFollowersPersonId = 0;
  var maxNumFollowers = 0;
  for(var person in data){
    var followersNumber = getFollowers(person).length;
    if(maxNumFollowers <= followersNumber){
      maxNumFollowers = followersNumber;
      mostFollowersPersonId = person;
    }
  }
  console.log("The person with most followers is: " + data[mostFollowersPersonId].name);

}
mostFollowers();
//Identify who has the most followers over 30
function mostFollowersOver30(){
  var maxNumFollowersOver30 = 0;
  var mostFollowersOver30PersonId = 0;
  for(person in data){
    var followersOver30 = getFollowersArray(person).filter(function(follower){
      return follower.age > 30
    });
    if(maxNumFollowersOver30 <= followersOver30.length){
      maxNumFollowersOver30 = followersOver30.length;
      mostFollowersOver30PersonId = person;
    }
  }
  console.log("The person with most followers over 30 is: " + data[mostFollowersOver30PersonId].name);
}
mostFollowersOver30();
//Identify who follows the most people over 30
function mostPeopleFollowingOver30(){
  var maxNumFollowingOver30 = 0;
  var mostFollowingOver30PersonId = 0;
  for(var person in data){
    var filteredFollowingArray = data[person].follows.filter(function(followingPersonId){
      return data[followingPersonId].age > 30;
    });
    if(maxNumFollowingOver30 <= filteredFollowingArray.length){
      maxNumFollowingOver30 = filteredFollowingArray.length;
      mostFollowingOver30PersonId = person;
    }
  }
  console.log("The person that follows more people over 30 is: " + data[mostFollowingOver30PersonId].name);
}
mostPeopleFollowingOver30();

//List those who follow someone that doesn't follow them back
function peopleDontLikeFollowingMe(){
  for(var personId in data){
    var followersArray = data[personId].follows;
    var notFollowingBack = [];
    var followingNames = [];
    followersArray.forEach(function(person){
      followingNames.push(data[person].name);
      if(!data[person].follows.includes(personId)){
        notFollowingBack.push(data[person].name);
      }
    });
    if(notFollowingBack.length != 0)
      console.log(data[personId].name + " follows " + followingNames.join(',') + " but " + notFollowingBack.join(',') + " do not follow back")
  }
}
peopleDontLikeFollowingMe();

 //List everyone and their reach (sum of # of followers and # of followers of followers)
function reach(){
  for(var person in data){
    var reachText = "";
    var numOfFollowers = 0;
    reachText += data[person].name + "'s reach is: ";
    var followersArray = getFollowers(person);
    numOfFollowers += followersArray.length;
    followersArray.forEach(function(follower){
      numOfFollowers += getFollowersArray(follower).length;
    });
    reachText += numOfFollowers;
    console.log(reachText);
  }
}
reach();
