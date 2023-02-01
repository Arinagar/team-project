import { CategoryTable } from 'components/CategoryTable/CategoryTable';
import { ChartComp } from 'components/Chart/ChartComp';
import {
  WrapperDesk,
  TableWrapperDesk,
  SelectWrapperDesk,
  ChartWrapperDesk,
  StatsTitleDesk,
  WrapperTablet,
  TableWrapperTablet,
  SelectWrapperTablet,
  ChartWrapperTablet,
  StatsTitleTablet,
  WrapperMobile,
  TableWrapperMobile,
  SelectWrapperMobile,
  ChartWrapperMobile,
  StatsTitleMobile,
  NoDataDesk,
  NoDataTablet,
  NoDataMobile,
  ChartCompLoadingDesk,
  ChartCompLoadingTablet,
  ChartCompLoadingMobile,
} from './DiagramTab.styled';
import { useEffect, useState } from 'react';
import { categoryColorSwitcher } from '../CategoryTable/categoryColorSwitcher.js';
import { useMedia } from 'components/Media/useMedia';
import {
  selectTrSummary,
  selectIsLoading,
  selectError,
  selectExpenseSummary,
  selectIncomeSummary,
} from 'redux/transactionsSumCont/transactionsSumCont-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsSummary } from 'redux/transactionsSumCont/transactionsSumCont-operations';
import { MoonLoader } from 'react-spinners';
import Multiselect from 'multiselect-react-dropdown';

export const DiagramTab = () => {
  const dispatch = useDispatch();
  const media = useMedia();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const optionsMonths = [
    { id: 1, value: '01', name: 'January' },
    { id: 2, value: '02', name: 'February' },
    { id: 3, value: '03', name: 'March' },
    { id: 4, value: '04', name: 'April' },
    { id: 5, value: '05', name: 'May' },
    { id: 6, value: '06', name: 'June' },
    { id: 7, value: '07', name: 'July' },
    { id: 8, value: '08', name: 'August' },
    { id: 9, value: '09', name: 'September' },
    { id: 10, value: '10', name: 'October' },
    { id: 11, value: '11', name: 'November' },
    { id: 12, value: '12', name: 'December' },
  ];

  const optionsYears = [
    { id: 1, value: '2022', name: '2022' },
    { id: 2, value: '2023', name: '2023' },
    { id: 3, value: '2024', name: '2024' },
    { id: 3, value: '2025', name: '2025' },
  ];

  const trSummary = useSelector(selectTrSummary);
  const expenseSummary = useSelector(selectExpenseSummary);
  const incomeSummary = useSelector(selectIncomeSummary);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const fetchTransactionsData = ({ month, year }) => {
      dispatch(getTransactionsSummary({ month, year }));
    };

    if (month && year) {
      fetchTransactionsData({ month, year });
    }
  }, [month, year, dispatch]);

  const initialData = {
    datasets: [
      {
        label: '# of Votes',
        data: [1],
        backgroundColor: ['#a6a6a6'],
        borderColor: ['transparent'],
      },
    ],
  };

  function prepareData() {
    const total = trSummary.map(el => el.total);
    const colors = trSummary.map(el => categoryColorSwitcher(el.name));

    let data = {
      datasets: [
        {
          data: total,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };
    return data;
  }

  function onSelectMonth(selectedList, selectedItem) {
    setMonth(selectedItem.value);
  }

  function onRemoveMonth() {
    setMonth('');
  }

  function onSelectYear(selectedList, selectedItem) {
    setYear(selectedItem.value);
  }

  function onRemoveYear() {
    setYear('');
  }

  return (
    <>
      {media.isDesktop && (
        <WrapperDesk>
          <ChartWrapperDesk>
            <StatsTitleDesk>Statistics</StatsTitleDesk>

            {/* INITIAL MOMENT OF TIME */}
            {!isLoading && (month.length === 0 || year.length === 0) && (
              <ChartComp data={initialData} />
            )}

            {/* WHEN SELECTED PERIOD BUT NO RESULTS */}
            {!isLoading && month && year && trSummary.length === 0 && (
              <ChartComp data={initialData} />
            )}

            {/* WHEN THERE ARE RESULTS */}
            {!isLoading &&
              trSummary.length > 0 &&
              month.length > 0 &&
              year.length > 0 && <ChartComp data={prepareData()} />}

            {/* IN CASE OF LOADING */}
            {isLoading && !error && (
              <ChartCompLoadingDesk>
                <MoonLoader color="#36d7b7" />
              </ChartCompLoadingDesk>
            )}
          </ChartWrapperDesk>
          <TableWrapperDesk>
            <SelectWrapperDesk>
              <Multiselect
                options={optionsMonths} // Options to display in the dropdown
                onSelect={onSelectMonth} // Function will trigger on select event
                onRemove={onRemoveMonth} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Month"
                style={{
                  searchBox: {
                    // To change search box element look
                    border: '1px solid black',
                    borderRadius: '30px',
                    width: '181px',
                    paddingLeft: '18px',
                    height: '46px',
                  },
                  option: {
                    // To change css for dropdown options
                    color: 'black',
                  },
                }}
                avoidHighlightFirstOption
                className={'backgroundColorCustom'}
                customCloseIcon={<div>&nbsp;&#215;</div>}
                singleSelect
              />
              <Multiselect
                options={optionsYears} // Options to display in the dropdown
                onSelect={onSelectYear} // Function will trigger on select event
                onRemove={onRemoveYear} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Year"
                style={{
                  searchBox: {
                    // To change search box element look
                    border: '1px solid black',
                    borderRadius: '30px',
                    width: '181px',
                    paddingLeft: '18px',
                    height: '46px',
                  },
                  option: {
                    // To change css for dropdown options
                    color: 'black',
                  },
                }}
                avoidHighlightFirstOption
                className={'backgroundColorCustom'}
                customCloseIcon={<div>&nbsp;&#215;</div>}
                singleSelect
              />
            </SelectWrapperDesk>

            {/* INITIAL MOMENT OF TIME */}
            {!isLoading && (month.length === 0 || year.length === 0) && (
              <NoDataDesk>
                Please, select period above to see transactions
              </NoDataDesk>
            )}

            {/* WHEN SELECTED PERIOD BUT NO RESULTS */}
            {!isLoading && month && year && trSummary.length === 0 && (
              <NoDataDesk>
                Sorry, but there are no transactions during that period
              </NoDataDesk>
            )}

            {/* WHEN THERE ARE RESULTS */}
            {!isLoading &&
              trSummary.length > 0 &&
              month.length > 0 &&
              year.length > 0 && (
                <CategoryTable
                  categoriesSummary={trSummary}
                  incomeSummary={incomeSummary}
                  expenseSummary={expenseSummary}
                />
              )}
          </TableWrapperDesk>
        </WrapperDesk>
      )}
      {media.isTablet && (
        <WrapperTablet>
          <ChartWrapperTablet>
            <StatsTitleTablet>Statistics</StatsTitleTablet>
            {/* INITIAL MOMENT OF TIME */}
            {!isLoading && (month.length === 0 || year.length === 0) && (
              <ChartComp data={initialData} />
            )}

            {/* WHEN SELECTED PERIOD BUT NO RESULTS */}
            {!isLoading && month && year && trSummary.length === 0 && (
              <ChartComp data={initialData} />
            )}

            {/* WHEN THERE ARE RESULTS */}
            {!isLoading &&
              trSummary.length > 0 &&
              month.length > 0 &&
              year.length > 0 && <ChartComp data={prepareData()} />}

            {/* IN CASE OF LOADING */}
            {isLoading && !error && (
              <ChartCompLoadingTablet>
                <MoonLoader color="#36d7b7" />
              </ChartCompLoadingTablet>
            )}
          </ChartWrapperTablet>
          <TableWrapperTablet>
            <SelectWrapperTablet>
              <Multiselect
                options={optionsMonths} // Options to display in the dropdown
                onSelect={onSelectMonth} // Function will trigger on select event
                onRemove={onRemoveMonth} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Month"
                style={{
                  searchBox: {
                    // To change search box element look
                    border: '1px solid black',
                    borderRadius: '30px',
                    width: '160px',
                    paddingLeft: '18px',
                    height: '46px',
                  },
                  option: {
                    // To change css for dropdown options
                    color: 'black',
                  },
                }}
                avoidHighlightFirstOption
                className={'backgroundColorCustom'}
                customCloseIcon={<div>&nbsp;&#215;</div>}
                singleSelect
              />
              <Multiselect
                options={optionsYears} // Options to display in the dropdown
                onSelect={onSelectYear} // Function will trigger on select event
                onRemove={onRemoveYear} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Year"
                style={{
                  searchBox: {
                    // To change search box element look
                    border: '1px solid black',
                    borderRadius: '30px',
                    width: '160px',
                    paddingLeft: '18px',
                    height: '46px',
                  },
                  option: {
                    // To change css for dropdown options
                    color: 'black',
                  },
                }}
                avoidHighlightFirstOption
                className={'backgroundColorCustom'}
                customCloseIcon={<div>&nbsp;&#215;</div>}
                singleSelect
              />
            </SelectWrapperTablet>
            {/* INITIAL MOMENT OF TIME */}
            {!isLoading && (month.length === 0 || year.length === 0) && (
              <NoDataTablet>
                Please, select period above to see transactions
              </NoDataTablet>
            )}

            {/* WHEN SELECTED PERIOD BUT NO RESULTS */}
            {!isLoading && month && year && trSummary.length === 0 && (
              <NoDataTablet>
                Sorry, but there are no transactions during that period
              </NoDataTablet>
            )}

            {/* WHEN THERE ARE RESULTS */}
            {!isLoading &&
              trSummary.length > 0 &&
              month.length > 0 &&
              year.length > 0 && (
                <CategoryTable
                  categoriesSummary={trSummary}
                  incomeSummary={incomeSummary}
                  expenseSummary={expenseSummary}
                />
              )}
          </TableWrapperTablet>
        </WrapperTablet>
      )}
      {media.isMobile && (
        <WrapperMobile>
          <ChartWrapperMobile>
            <StatsTitleMobile>Statistics</StatsTitleMobile>
            {/* INITIAL MOMENT OF TIME */}
            {!isLoading && (month.length === 0 || year.length === 0) && (
              <ChartComp data={initialData} />
            )}

            {/* WHEN SELECTED PERIOD BUT NO RESULTS */}
            {!isLoading && month && year && trSummary.length === 0 && (
              <ChartComp data={initialData} />
            )}

            {/* WHEN THERE ARE RESULTS */}
            {!isLoading &&
              trSummary.length > 0 &&
              month.length > 0 &&
              year.length > 0 && <ChartComp data={prepareData()} />}

            {/* IN CASE OF LOADING */}
            {isLoading && !error && (
              <ChartCompLoadingMobile>
                <MoonLoader color="#36d7b7" />
              </ChartCompLoadingMobile>
            )}
          </ChartWrapperMobile>
          <TableWrapperMobile>
            <SelectWrapperMobile>
              <Multiselect
                options={optionsMonths} // Options to display in the dropdown
                onSelect={onSelectMonth} // Function will trigger on select event
                onRemove={onRemoveMonth} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Month"
                style={{
                  searchBox: {
                    // To change search box element look
                    border: '1px solid black',
                    borderRadius: '30px',
                    width: '280px',
                    paddingLeft: '18px',
                    height: '46px',
                  },
                  option: {
                    // To change css for dropdown options
                    color: 'black',
                  },
                }}
                avoidHighlightFirstOption
                className={'backgroundColorCustom'}
                customCloseIcon={<div>&nbsp;&#215;</div>}
                singleSelect
              />
              <Multiselect
                options={optionsYears} // Options to display in the dropdown
                onSelect={onSelectYear} // Function will trigger on select event
                onRemove={onRemoveYear} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Year"
                style={{
                  searchBox: {
                    // To change search box element look
                    border: '1px solid black',
                    borderRadius: '30px',
                    width: '280px',
                    paddingLeft: '18px',
                    height: '46px',
                  },
                  option: {
                    // To change css for dropdown options
                    color: 'black',
                  },
                }}
                avoidHighlightFirstOption
                className={'backgroundColorCustom'}
                customCloseIcon={<div>&nbsp;&#215;</div>}
                singleSelect
              />
            </SelectWrapperMobile>
            {/* INITIAL MOMENT OF TIME */}
            {!isLoading && (month.length === 0 || year.length === 0) && (
              <NoDataMobile>
                Please, select period above to see transactions
              </NoDataMobile>
            )}

            {/* WHEN SELECTED PERIOD BUT NO RESULTS */}
            {!isLoading && month && year && trSummary.length === 0 && (
              <NoDataMobile>
                Sorry, but there are no transactions during that period
              </NoDataMobile>
            )}

            {/* WHEN THERE ARE RESULTS */}
            {!isLoading &&
              trSummary.length > 0 &&
              month.length > 0 &&
              year.length > 0 && (
                <CategoryTable
                  categoriesSummary={trSummary}
                  incomeSummary={incomeSummary}
                  expenseSummary={expenseSummary}
                />
              )}
          </TableWrapperMobile>
        </WrapperMobile>
      )}
    </>
  );
};
