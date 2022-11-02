const { dragons } = require('../sampleData.js');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

// Dragons Type
const DragonType = new GraphQLObjectType({
    name: 'Dragon',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        wood: { type: GraphQLString },
        fish: { type: GraphQLString },
        iron: { type: GraphQLString },
        gatheringTime: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        dragons: {
            type: GraphQLList(DragonType),
            resolve(parent, args) {
                return dragons;
            },
        },
        dragon: { 
            type: DragonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return dragons.find(dragon => dragon.id === args.id);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})