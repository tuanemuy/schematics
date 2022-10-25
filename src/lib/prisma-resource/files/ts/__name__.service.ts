import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { <%= singular(classify(name)) %>, Prisma } from '@prisma/client';

@Injectable()
export class <%= classify(name) %>Service {<% if (crud) { %>
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.<%= singular(classify(name)) %>CreateInput): Promise<<%= singular(classify(name)) %>> {
    return this.prisma.<%= lowercased(singular(name)) %>.create({ data });
  }

  async findOne(where: Prisma.<%= singular(classify(name)) %>WhereUniqueInput): Promise<<%= singular(classify(name)) %> | null> {
    return this.prisma.<%= lowercased(singular(name)) %>.findUnique({ where });
  }

  async findAll(params: Prisma.<%= singular(classify(name))FindManyArgs): Promise<<%= singular(classify(name)) %>[]> {
    return this.prisma.<%= lowercased(singular(name)) %>.findMany(params);
  }

  async update(
    where: Prisma.<%= singular(classify(name)) %>WhereUniqueInput,
    data: Prisma.<%= singular(classify(name)) %>UpdateInput,
  ): Promise<<%= singular(classify(name)) %>> {
    return this.prisma.<%= lowercased(singular(name)) %>.update({ where, data });
  }

  async remove(where: Prisma.<%= singular(classify(name)) %>WhereUniqueInput): Promise<<%= singular(classify(name)) %>> {
    return this.prisma.<%= lowercased(singular(name)) %>.delete({
      where,
    });
  }
<% } %>}
