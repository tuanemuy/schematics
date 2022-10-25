import { Resolver<% if (crud && type === 'graphql-schema-first') { %>, Query, Mutation, Args<% } else if (crud && type === 'graphql-code-first') { %>, Query, Mutation, Args, Int<% } %> } from '@nestjs/graphql';
import { <%= classify(name) %>Service } from './<%= name %>.service';<% if (crud && type === 'graphql-code-first') { %>
import { <%= singular(classify(name)) %>, Prisma } from '@prisma/client';<% } %>

<% if (type === 'graphql-code-first' && crud) { %>@Resolver(() => <%= singular(classify(name)) %>)<% } else if (type === 'graphql-code-first') {%>@Resolver()<% } else { %>@Resolver('<%= singular(classify(name)) %>')<% } %>
export class <%= classify(name) %>Resolver {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (crud && type === 'graphql-code-first') { %>

  @Mutation(() => <%= singular(classify(name)) %>)
  async create<%= singular(classify(name)) %>(@Args('data') data: Prisma.<%= singular(classify(name)) %>CreateInput): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.create(data);
  }

  @Query(() => [<%= singular(classify(name)) %>], { name: '<%= lowercased(classify(name)) %>' })
  async findAll(@Args('query') query: Prisma.<%= singular(classify(name)) %>FindManyArgs): Promise<<%= singular(classify(name)) %>[]> {
    return this.<%= lowercased(name) %>Service.findAll(query);
  }

  @Query(() => <%= singular(classify(name)) %>, { name: '<%= lowercased(singular(classify(name))) %>' })
  async findById(@Args('id', { type: () => Int }) id: number): Promise<<%= singular(classify(name)) %> | null> {
    return this.<%= lowercased(name) %>Service.findOne({ id });
  }

  @Mutation(() => <%= singular(classify(name)) %>)
  async update<%= singular(classify(name)) %>(@Args('id', { type: () => Int }) id: number, @Args('data') data: Prisma.<%= singular(classify(name)) %>UpdateInput): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.update({ id }, data);
  }

  @Mutation(() => <%= singular(classify(name)) %>)
  async remove<%= singular(classify(name)) %>(@Args('id', { type: () => Int }) id: number): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.remove({ id });
  }<% } else if (crud && type === 'graphql-schema-first') {%>

  @Mutation('create<%= singular(classify(name)) %>')
  async create(@Args('data') data: Prisma.<%= singular(classify(name)) %>CreateInput) {
    return this.<%= lowercased(name) %>Service.create(data);
  }

  @Query('<%= lowercased(classify(name)) %>')
  async findAll(@Args('query') query: Prisma.<%= singular(classify(name)) %>FindManyArgs) {
    return this.<%= lowercased(name) %>Service.findAll(query);
  }

  @Query('<%= lowercased(singular(classify(name))) %>ById')
  async findById(@Args('id', { type: () => Int }) id: number) {
    return this.<%= lowercased(name) %>Service.findOne({ id });
  }

  @Mutation('update<%= singular(classify(name)) %>')
  async update(@Args('id', { type: () => Int }) id: number, @Args('data') data: Prisma.<%= singular(classify(name)) %>UpdateInput) {
    return this.<%= lowercased(name) %>Service.update({ id }, data);
  }

  @Mutation('remove<%= singular(classify(name)) %>')
  async remove(@Args('id', { type: () => Int }) id: number) {
    return this.<%= lowercased(name) %>Service.remove({ id });
  }<% } %>
}
