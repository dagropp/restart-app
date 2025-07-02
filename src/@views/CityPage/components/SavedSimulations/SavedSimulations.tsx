import Button from '@common/Button';
import Select, { SelectOption } from '@common/Select';
import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { ButtonGroup } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import apiService, {
  SaveSimulationPayload,
  UpdateSimulationPayload,
} from '@services/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { is } from '@utils/is.utils';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useCityContext, useCostContext } from '../../context';
import { useFlightsData, useIncomeData } from '../../hooks';
import { DeleteSimulationDialog, SaveSimulationDialog } from './components';
import {
  generateSimulationSnapshot,
  getSelectedPreset,
  parsePreset,
} from './utils';

export const SavedSimulations = () => {
  const {
    positiveState,
    negativeState,
    updateNegativeState,
    updatePositiveState,
  } = useCostContext();
  const userIncome = useIncomeData('income');
  const partnerIncome = useIncomeData('partnerIncome');
  const flight = useFlightsData();
  const {
    user: userData,
    group: { partner: partnerData },
  } = useUserContext();
  const { item, cost } = useCityContext();
  const { currencies } = useAppContext();
  const [selected, setSelected] = useState<number | undefined>();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLButtonElement>(
    null,
  );
  const initialState = useRef({ positiveState, negativeState });

  const { data = [] } = useQuery({
    queryKey: ['getPresets'],
    queryFn: () => apiService.simulation.get(),
  });

  const handlePreset = useCallback(
    (id?: number) => {
      setSelected(id);
      const preset = getSelectedPreset(data, id);
      if (!preset) {
        updatePositiveState(initialState.current.positiveState);
        updateNegativeState(initialState.current.negativeState);
      } else {
        const { negative, positive } = parsePreset({
          preset,
          userIncome,
          partnerIncome,
          userData,
          costData: cost,
          currencies,
          currency: item.country.currency,
          flightPrice: flight.cheapest?.price,
          partnerData,
        });
        updatePositiveState(positive);
        updateNegativeState(negative);
      }
    },
    [
      cost,
      currencies,
      data,
      flight.cheapest?.price,
      item.country.currency,
      partnerData,
      partnerIncome,
      updateNegativeState,
      updatePositiveState,
      userData,
      userIncome,
    ],
  );

  const createSimulationApi = useMutation({
    mutationFn: (payload: SaveSimulationPayload) =>
      apiService.simulation.create(payload),
  });

  const updateSimulationApi = useMutation({
    mutationFn: (payload: UpdateSimulationPayload) =>
      apiService.simulation.update(payload),
  });

  const openSaveDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
    setMenuAnchorEl(null);
  }, []);

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    setMenuAnchorEl(null);
  };

  const handleSave = useCallback(
    (name: string) => {
      const snapshot = generateSimulationSnapshot(
        positiveState,
        negativeState,
        userIncome,
        partnerIncome,
        cost,
      );
      return createSimulationApi.mutateAsync({ name, ...snapshot });
    },
    [
      cost,
      createSimulationApi,
      negativeState,
      partnerIncome,
      positiveState,
      userIncome,
    ],
  );

  const handleUpdate = useCallback(() => {
    const preset = getSelectedPreset(data, selected);
    if (preset) {
      const { name, id } = preset;
      const snapshot = generateSimulationSnapshot(
        positiveState,
        negativeState,
        userIncome,
        partnerIncome,
        cost,
      );
      return updateSimulationApi.mutateAsync({ name, id, ...snapshot });
    } else {
      openSaveDialog();
    }
  }, [
    cost,
    data,
    negativeState,
    openSaveDialog,
    partnerIncome,
    positiveState,
    selected,
    updateSimulationApi,
    userIncome,
  ]);

  const options = useMemo(() => {
    const list: SelectOption<number | undefined>[] = data.map(
      ({ id, name }) => ({
        value: id,
        label: name,
      }),
    );
    return !is.nullOrUndefined(selected)
      ? ([{ label: 'Off' }, ...list] as SelectOption<number>[])
      : list;
  }, [data, selected]);

  const hasPresets = data.length > 0;
  const hasActivePreset = !is.nullOrUndefined(selected);

  return (
    <>
      <div className="flex items-center gap-2 w-full justify-center">
        {hasPresets && (
          <div className="w-[200px]">
            <Select<number>
              options={options}
              onChange={handlePreset}
              label="Saved Simulations"
              placeholder="Saved Simulations"
              size="small"
            />
          </div>
        )}
        <ButtonGroup variant="contained" className="h-11 !shadow-none">
          {hasActivePreset ? (
            <Button onClick={handleUpdate}>Update Simulation</Button>
          ) : (
            <Button onClick={openSaveDialog}>Save Simulation</Button>
          )}
          {hasActivePreset && (
            <Button onClick={(event) => setMenuAnchorEl(event.currentTarget)}>
              <KeyboardArrowDownRoundedIcon fontSize="small" />
            </Button>
          )}
        </ButtonGroup>
      </div>
      <Menu
        anchorEl={menuAnchorEl}
        anchorOrigin={{ vertical: 48, horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem onClick={openSaveDialog}>
          <Typography variant="button">Save New Simulation</Typography>
        </MenuItem>
        <MenuItem onClick={openDeleteDialog}>
          <Typography variant="button">Delete Simulation</Typography>
        </MenuItem>
      </Menu>
      <SaveSimulationDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleSave}
      />
      <DeleteSimulationDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        id={selected ?? -1}
      />
    </>
  );
};
