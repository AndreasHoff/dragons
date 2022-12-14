const { dragons } = require('../sampleData.js');

const Dragons = require('../models/Dragon');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
const Dragon = require('../models/Dragon');

// Dragons Type
const DragonType = new GraphQLObjectType({
    name: 'Dragon',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        fish: { type: GraphQLString },
        wood: { type: GraphQLString },
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
                return Dragon.find();
            },
        },
        dragon: { 
            type: DragonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Dragons.findById(args.id);
            }
        },
    }
});

// Mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add Dragon
        addDragon: {
            type: DragonType,
            args: { 
                name: { type: GraphQLNonNull(GraphQLString) },
                fish: { type: GraphQLNonNull(GraphQLString) },
                wood: { type: GraphQLNonNull(GraphQLString) },
                iron: { type: GraphQLNonNull(GraphQLString) },
                gatheringTime: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const dragon = new Dragon({
                    name: args.name,
                    fish: args.fish,
                    wood: args.wood,
                    iron: args.iron,
                    gatheringTime: args.gatheringTime,
                });

                return dragon.save();
            },
        },
        // Delete Dragon
        deleteDragon: {
            type: DragonType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Dragon.findByIdAndRemove(args.id);
            }
        },
        // Update a dragon
        updateDragon: {
            type: DragonType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                fish: { type: GraphQLString },
                wood: { type: GraphQLString },
                iron: { type: GraphQLString },
                gatheringTime: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Dragon.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            fish: args.fish,
                            wood: args.wood,
                            iron: args.iron,
                            gatheringTime: args.gatheringTime,
                        }
                    },
                    { new: true}
                );
            }
        }
    }     
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})