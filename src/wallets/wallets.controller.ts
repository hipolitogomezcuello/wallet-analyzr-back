import {Controller, Delete, Get, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {WalletsService} from "./wallets.service";
import {AuthGuard} from "../auth/auth.guard";

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req): Promise<any> {
    const userId = req.user.sub
    const address = req.body.address
    const usd = req.body.usd
    const eur = req.body.eur
    return await this.walletsService.create(userId, address, usd, eur)
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(@Request() req): Promise<any> {
    const id = req.params.id
    const userId = req.user.sub
    const usd = req.body.usd
    const eur = req.body.eur
    const wallet = await this.walletsService.findById(id)
    if (wallet.userId !== userId) {
      throw new Error('You are not allowed to update this wallet')
    }
    return await this.walletsService.update(id, usd, eur)
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Request() req): Promise<void> {
    const id = req.params.id
    const userId = req.user.sub
    const wallet = await this.walletsService.findById(id)
    if (wallet.userId !== userId) {
      throw new Error('You are not allowed to delete this wallet')
    }
    await this.walletsService.delete(id)
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req): Promise<any[]> {
    const userId = req.user.sub
    return await this.walletsService.findAll(userId)
  }
}
