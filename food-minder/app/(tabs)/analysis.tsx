import React, { useState, useRef } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  StyleSheet, 
  Dimensions, 
  Text, 
  Platform,
  TouchableOpacity
} from 'react-native';
import { Title, Card } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';

const { width: screenWidth } = Dimensions.get('window');

const lineChartData = {
  labels: ['Dec','Jan','Feb'],
  datasets: [{
    data: [451, 320, 550],
    strokeWidth: 2,
    color: (opacity = 1) => `rgba(71, 117, 242, ${opacity})`,
  }]
};

const pieChartData = [
  { name: 'Dairy', population: 160, color: '#233D4D' },
  { name: 'Meat', population: 329, color: '#D0DB95' },
  { name: 'Fruits', population: 144, color: '#67B8CA' },
  { name: 'Veggies', population: 120, color: '#F4A4B9' },
  { name: 'Seafood', population: 98, color: '#CC93DC' },
  { name: 'Baked Goods', population: 25, color: '#A8461F' },
  { name: 'Snacks', population: 45 , color: '#6A6AC1' },
];

const totalFoodExpenditure = pieChartData.reduce((sum, item) => sum + item.population, 0);
const wastedFoodAmount = 85; 

const chartConfig = {
  backgroundColor: 'transparent',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(71, 117, 242, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#4775F2'
  },
  propsForLabels: {
    fontSize: 12,
  },
  fromZero: true,

};

const PAGES = [
  { id: 'spendingOverview', title: 'Spending Overview' },
  { id: 'expenseCategories', title: 'Expense Categories' }
];

const getCurrentMonth = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  return months[currentDate.getMonth()];
};

const AnalysisScreen = () => {
  const [activePage, setActivePage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  interface PageChangeHandler {
    (index: number): void;
  }

  const handlePageChange: PageChangeHandler = (index) => {
    setActivePage(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true
    });
  };

  interface ScrollEvent {
    nativeEvent: {
      contentOffset: {
        x: number;
      };
    };
  }

  const handleScroll = (event: ScrollEvent) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / screenWidth);
    if (pageIndex !== activePage) {
      setActivePage(pageIndex);
    }
  };

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      {pieChartData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.name}</Text>
          <Text style={styles.legendValue}>${item.population}</Text>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Expenditure</Text>
        <Text style={styles.totalValue}>${totalFoodExpenditure}</Text>
      </View>
      <View style={styles.wastedContainer}>
        <Text style={styles.wastedText}>Wasted Food Amount</Text>
        <Text style={styles.wastedValue}>${wastedFoodAmount}</Text>
      </View>
    </View>

  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.pageSelector}>
          {PAGES.map((page, index) => (
            <TouchableOpacity
              key={page.id}
              style={[
                styles.pageSelectorButton,
                activePage === index && styles.activePageButton
              ]}
              onPress={() => handlePageChange(index)}
            >
              <Text style={[
                styles.pageSelectorText,
                activePage === index && styles.activePageText
              ]}>
                {page.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          <View style={styles.page}>
            <Card style={styles.chartCard}>
              <Card.Content>
                <Text style={styles.monthText}>{getCurrentMonth()}</Text>
                <LineChart
                  data={lineChartData}
                  width={screenWidth - 48}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                  formatYLabel={(value) => `$${value}`}
                />
              </Card.Content>
            </Card>
          </View>

          <View style={styles.page}>
            <Card style={styles.chartCard}>
              <Card.Content>
                <Text style={styles.monthText}>{getCurrentMonth()}</Text>
                <PieChart
                  data={pieChartData.map(item => ({
                    name: item.name,
                    population: item.population,
                    color: item.color,
                    legendFontColor: '#333333',
                    legendFontSize: 12
                  }))}
                  width={screenWidth - 48}
                  height={220}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="0"
                  center={[screenWidth / 5, 1]} 
                  absolute
                  style={styles.chart}
                  hasLegend={false}
                />
                {renderLegend()}
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FADA7A',
  },
  container: {
    flex: 1,
  },
  pageSelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  pageSelectorButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
  },
  activePageButton: {
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pageSelectorText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activePageText: {
    color: '#333333',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width: screenWidth,
    padding: 16,
  },
  chartCard: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 8,
  },
  totalText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  wastedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 8,
  },
  wastedText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B', // A reddish color to indicate waste
  },
  wastedValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  }
});

export default AnalysisScreen;