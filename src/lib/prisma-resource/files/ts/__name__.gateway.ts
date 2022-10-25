import { WebSocketGateway<% if (crud) { %>, SubscribeMessage, MessageBody<% } %> } from '@nestjs/websockets';
import { <%= classify(name) %>Service } from './<%= name %>.service';<% if (crud) { %>
import { <%= singular(classify(name)) %>, Prisma } from '@prisma/client';<% } %>

@WebSocketGateway()
export class <%= classify(name) %>Gateway {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (crud) { %>

  @SubscribeMessage('create<%= singular(classify(name)) %>')
  async create(@MessageBody() data: Prisma.<%= singular(classify(name)) %>CreateInput): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.create(data);
  }

  @SubscribeMessage('findAll<%= classify(name) %>')
  async findAll(@MessageBody() query: Prisma.<%= singular(classify(name)) %>FindManyArgs): Promise<<%= singular(classify(name)) %>[]> {
    return this.<%= lowercased(name) %>Service.findAll(query);
  }

  @SubscribeMessage('find<%= singular(classify(name)) %>ById')
  async findById(@MessageBody() id: number): Promise<<%= singular(classify(name)) %> | null> {
    return this.<%= lowercased(name) %>Service.findOne({ id });
  }

  @SubscribeMessage('update<%= singular(classify(name)) %>')
  async update(@MessageBody() id: number, @MessageBody() data: Prisma.<%= singular(classify(name)) %>UpdateInput): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.update({ id }, data);
  }

  @SubscribeMessage('remove<%= singular(classify(name)) %>')
  async remove(@MessageBody() id: number): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.remove({ id });
  }<% } %>
}
