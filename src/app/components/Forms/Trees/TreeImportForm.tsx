import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImportIcon from '@mui/icons-material/ImportExport';
import DownloadIcon from '@mui/icons-material/Download';
import * as exceljs from 'exceljs'
import { ITree } from '@/types/tree/tree';
import { GroupedTreesTable } from './GroupedTreesTable';
import { IAutex } from '@/types/autex/autex';
import { CreateTreeService } from '@/services/treeService';
import ToastMessage from '../../Toast';

export type AggregatedDataItem = {
    scientificName: string;
    commonName: string;
    volumeM3: number;
    qtd: number;
    product_id: number | null
};

interface TreeImportFormProps {
    autex?: IAutex
}

export const TreeImportForm = ({ autex }: TreeImportFormProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [trees, setTrees] = useState<ITree[]>([]);
    const [groups, setGroups] = useState<AggregatedDataItem[]>([])
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };
    const handleImport = async () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                    const data = e.target.result as Buffer;
                    const workbook = new exceljs.Workbook();
                    await workbook.xlsx.load(data);

                    const worksheet = workbook.worksheets[0];
                    const headerRow = worksheet.getRow(1).values;

                    const rows: ITree[] = [];
                    worksheet.eachRow((row, rowNumber) => {
                        if (rowNumber > 1) {
                            const rowData: ITree = {
                                range: 0,
                                code: '',
                                scientificName: '',
                                commonName: '',
                                dap: 0,
                                meters: 0,
                                volumeM3: 0,
                                product_id: null,
                                autex_id: autex?.id
                            };
                            row.eachCell((cell, colNumber) => {
                                //@ts-ignore
                                const header = headerRow[colNumber];
                                const renamedHeader = renameHeader(header);
                                //@ts-ignore
                                rowData[renamedHeader] = cell.value;
                            });
                            rows.push(rowData);
                            const aggregatedData: AggregatedDataItem[] = rows.reduce((acc: any, tree) => {
                                const { scientificName, commonName, volumeM3 } = tree;
                                const existingTree = acc.find((aggregateItem: any) => aggregateItem.scientificName === scientificName)

                                if (existingTree) {
                                    existingTree.qtd++;
                                    existingTree.volumeM3 += volumeM3
                                } else {
                                    acc.push({
                                        scientificName: scientificName,
                                        commonName: commonName,
                                        volumeM3: Number(volumeM3.toFixed(3)),
                                        product_id: null,
                                        qtd: 1
                                    });
                                }
                                return acc;
                            }, [])
                            setTrees(rows)
                            setGroups(aggregatedData)
                        }
                    });
                }
            };

            reader.readAsBinaryString(file);
        }
    };

    function renameHeader(originalHeader: string): string {
        if (originalHeader.toLowerCase() === 'arvore') {
            return 'code';
        } else if (originalHeader.toLowerCase() === 'picada') {
            return 'range';
        } else if (originalHeader.toLocaleLowerCase() === 'cientifico') {
            return 'scientificName'
        } else if (originalHeader.toLocaleLowerCase() === 'popular') {
            return 'commonName'
        } else if (originalHeader.toLocaleLowerCase() === 'dap') {
            return 'dap'
        } else if (originalHeader.toLocaleLowerCase() === 'altura') {
            return 'meters'
        } else if (originalHeader.toLocaleLowerCase() === 'volume') {
            return 'volumeM3'
        }
        return originalHeader;
    }
    const downloadModel = () => {
        const modelFilePath = '/modelo-cadastro-arvores.xlsx';
        const link = document.createElement('a');
        link.href = modelFilePath;
        link.download = 'modelo.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleSubmit = async (data: AggregatedDataItem[]) => {
        const newData = trees.map((tree) => {
            const matchingItem = data.find((item) => tree.scientificName === item.scientificName);
            if (matchingItem) {
                return {
                    ...tree,
                    product_id: matchingItem.product_id,
                    autex_id: autex?.id
                };
            }
            return tree;
        });
        await CreateTreeService(newData).then((response) => {
            ToastMessage({ type: 'success', message: 'Arvores cadastrada com sucesso!.' })
        }).catch((error) => {
            ToastMessage({ type: 'error', message: 'Ocorreu um erro, tente novamente...' })
        })

    }
    return (
        <Box display='flex' flexDirection='column' gap={2}>
            {autex &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            <span style={{ fontWeight: 'bold' }}>Descrição: </span>{autex.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            <span style={{ fontWeight: 'bold' }}>Cod. Autex: </span>{autex.code}
                        </Typography>
                    </Grid>
                </Grid>
            }
            <Box display="flex" alignItems="center" justifyContent='space-between'>
                <Box gap={2} display='flex'>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        component="label"
                        disabled={!!file}
                    >
                        Adicionar Arquivo
                        <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ImportIcon />}
                        onClick={handleImport}
                        disabled={!file}
                    >
                        Importar Dados
                    </Button>
                </Box>
                <Button
                    variant='contained'
                    color='info'
                    onClick={downloadModel}
                    startIcon={<DownloadIcon />}
                >
                    Baixar Modelo
                </Button>
            </Box>
            {groups.length > 0 ? (
                <GroupedTreesTable
                    data={groups}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <Box height={450} component={Paper} elevation={2} justifyContent='center' alignItems='center' display='flex' flexDirection='column'>
                    <Typography variant="h6" gutterBottom>Importe alguma planilha para carregar os dados...</Typography>
                    <Typography variant="body2">Siga as instruções acima para adicionar um arquivo e clique em Importar.</Typography>
                </Box>
            )}
            {file &&
                <Typography variant="caption" fontWeight='bold' marginTop={1}>
                    Fonte de dados: {fileName}
                </Typography>
            }
        </Box>
    )
}