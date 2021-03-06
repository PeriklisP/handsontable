import { ColumnStatesManager } from 'handsontable/plugins/columnSorting/columnStatesManager';
import { DESC_SORT_STATE, ASC_SORT_STATE } from 'handsontable/plugins/columnSorting/utils';
import { getClassesToAdd, getClassesToRemove } from 'handsontable/plugins/multiColumnSorting/domHelpers';
import { IndexMapper } from 'handsontable/translations';

const hotMock = {
  toPhysicalColumn: column => column,
  toVisualColumn: column => column,
  columnIndexMapper: new IndexMapper()
};

// Mocking that table have 5.
hotMock.columnIndexMapper.initToLength(5);

describe('MultiColumnSorting DOM helpers', () => {
  describe('getClassesToAdd', () => {
    it('multiple sorted columns', () => {
      const columnStatesManager = new ColumnStatesManager(hotMock, 'sortingStates');

      columnStatesManager.setSortStates([
        { column: 1, sortOrder: DESC_SORT_STATE },
        { column: 0, sortOrder: ASC_SORT_STATE },
      ]);

      expect(getClassesToAdd(columnStatesManager, 0, false).includes('sort-2')).toBeFalsy();
      expect(getClassesToAdd(columnStatesManager, 0, true).includes('sort-2')).toBeTruthy();

      expect(getClassesToAdd(columnStatesManager, 1, false).includes('sort-1')).toBeFalsy();
      expect(getClassesToAdd(columnStatesManager, 1, true).includes('sort-1')).toBeTruthy();

      columnStatesManager.destroy(); // Unregister already registered Index Map.
    });
  });

  describe('getClassesToRemove', () => {
    it('should return all calculated classes', () => {
      const columnStatesManager = new ColumnStatesManager(hotMock, 'sortingStates');

      columnStatesManager.setSortStates([
        { column: 1, sortOrder: DESC_SORT_STATE },
        { column: 0, sortOrder: ASC_SORT_STATE },
        { column: 2, sortOrder: ASC_SORT_STATE },
        { column: 3, sortOrder: ASC_SORT_STATE },
      ]);

      const htmlElementMock = { className: 'columnSorting sort-1 sort-2 sort-3 sort-4 sortAction' };

      expect(getClassesToRemove(htmlElementMock).length).toEqual(4);
      expect(getClassesToRemove(htmlElementMock).includes('sort-1')).toBeTruthy();
      expect(getClassesToRemove(htmlElementMock).includes('sort-2')).toBeTruthy();
      expect(getClassesToRemove(htmlElementMock).includes('sort-3')).toBeTruthy();
      expect(getClassesToRemove(htmlElementMock).includes('sort-4')).toBeTruthy();

      columnStatesManager.destroy(); // Unregister already registered Index Map.
    });
  });
});
