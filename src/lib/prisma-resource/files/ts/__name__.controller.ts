<% if (crud && type === 'rest') { %>import { Controller, Get, Post, Body, Query, Patch, Param, Delete } from '@nestjs/common';<%
} else if (crud && type === 'microservice') { %>import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';<%
} else { %>import { Controller } from '@nestjs/common';<%
} %>
import { <%= classify(name) %>Service } from './<%= name %>.service';<% if (crud) { %>
import { <%= singular(classify(name)) %>, Prisma } from '@prisma/client';<% } %>

<% if (type === 'rest') { %>@Controller('<%= dasherize(name) %>')<% } else { %>@Controller()<% } %>
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (type === 'rest' && crud) { %>

  @Post()
  async create(@Body() data: Prisma.<%= singular(classify(name)) %>CreateInput): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.create(data);
  }

  @Get()
  async findAll(@Query() query: Prisma.<%= singular(classify(name)) %>FindManyArgs): Promise<<%= singular(classify(name)) %>[]> {
    return this.<%= lowercased(name) %>Service.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<<%= singular(classify(name)) %> | null> {
    return this.<%= lowercased(name) %>Service.findOne({ id: +id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.<%= singular(classify(name)) %>UpdateInput) {
    return this.<%= lowercased(name) %>Service.update({ id: +id }, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.<%= lowercased(name) %>Service.remove({ id: +id });
  }<% } else if (type === 'microservice' && crud) { %>

  @MessagePattern('create<%= singular(classify(name)) %>')
  async create(@Payload() data: Prisma.<%= singular(classify(name)) %>CreateInput): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.create(data);
  }

  @MessagePattern('findAll<%= classify(name) %>')
  async findAll(@Payload() query: Prisma.<%= singular(classify(name)) %>FindManyArgs): Promise<<%= singular(classify(name)) %>[]> {
    return this.<%= lowercased(name) %>Service.findAll(query);
  }

  @MessagePattern('find<%= singular(classify(name)) %>ById')
  async findById(@Payload() id: number): Promise<<%= singular(classify(name)) %> | null> {
    return this.<%= lowercased(name) %>Service.findOne({ id });
  }

  @MessagePattern('update<%= singular(classify(name)) %>')
  async update(@Payload() id: number, @Payload() data: Prisma.<%= singular(classify(name)) %>UpdateInput): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.update({ id }, data);
  }

  @MessagePattern('remove<%= singular(classify(name)) %>')
  async remove(@Payload() id: number): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.remove({ id });
  }<% } %>
}
