import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../commons/dto/page-options.dto';
import { PageResponseDto } from '../commons/dto/page-response.dto';
import { ClientService } from './client.service';
import { CreateClientResponseDto } from './dto/create-client-response.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { FilterClientDto } from './dto/filter-client.dto';
import { ClientRequestDto } from './dto/client-request.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client', operationId: 'createClient' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreateClientResponseDto,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
  async createClient(@Body() createClientDto: ClientRequestDto): Promise<CreateClientResponseDto> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Gets a list of clients', operationId: 'findClients' })
  @ApiOkResponse({ type: [ClientResponseDto] })
  async findClients(
    @Query() filterDto: FilterClientDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageResponseDto<ClientResponseDto>> {
    return this.clientService.findClients(filterDto, pageOptionsDto);
  }

  @Get('/:id')
  @ApiParam({ type: 'string', name: 'id' })
  @ApiOperation({ summary: 'Gets details of an specific client', operationId: 'findClient' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ClientResponseDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Client not found' })
  async findClient(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientService.findOrder(id);
  }
}
